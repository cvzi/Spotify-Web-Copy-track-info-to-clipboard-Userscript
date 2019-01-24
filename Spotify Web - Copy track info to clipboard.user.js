// ==UserScript==
// @name          Spotify Web - Copy track info to clipboard
// @description   Adds an entry in the context menu that copies the selected song name and artist to the clipboard
// @namespace     https://openuserjs.org/users/cuzi
// @version       2
// @license       MIT
// @copyright     2017, cuzi (https://openuserjs.org/users/cuzi)
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant         GM.setClipboard
// @grant         GM_setClipboard
// @include       https://open.spotify.com/*
// ==/UserScript==

// ==OpenUserJS==
// @author       cuzi
// ==/OpenUserJS==

"use strict";

(function () {
  
  let getSongTitle = function ($titlenodes) {
    let title_text;
    
    if($titlenodes) {
      title_text = $titlenodes.text();
      if(title_text && title_text.trim()) {
        return title_text.trim();
      }
    }
    
    if($(".track-info__name")) {
      title_text = $(".track-info__name")[0].innerText;
      if(title_text && title_text.trim()) {
        return title_text.trim();
      }
    }
    
    return "";
  };
  
  let getArtistName = function ($artistnodes) {
    let artist_text;
    
    if($artistnodes) {
      artist_text = $artistnodes.not((i, e) => e.className).text();
      if(artist_text && artist_text.trim()) {
        return artist_text.trim();
      }
      
      // In playlist:
      if($artistnodes.find(".ellipsis-one-line").length > 0) {
        artist_text = $artistnodes.find(".ellipsis-one-line")[0].innerText;
        if(artist_text && artist_text.trim()) {
          return artist_text.trim();
        }
      }
      
      // Something else, just accumulate all artist links: <a href="/artist/ARTISTID">Artistname</a>
      if($artistnodes.find('a[href^="/artist/"]').length > 0) {
        return $.map($artistnodes.find('a[href^="/artist/"]'), (element) => $(element).text().trim()).join(", ");
      }
         
      
    }
    
    if(document.location.pathname.startsWith("/artist/")) {
		  artist_text = $("header h1").text();
      if(artist_text && artist_text.trim()) {
        return artist_text.trim();
      } 
    }
    
    if(document.location.pathname.startsWith("/album/")) {
		  artist_text = $(".media-object .mo-meta").text();
      if(artist_text && artist_text.trim()) {
        return artist_text.trim();
      } 
    }
    
    if($(".track-info__artists")) {
      artist_text = $(".track-info__artists")[0].innerText;
      if(artist_text && artist_text.trim()) {
        return artist_text.trim();
      }
    }
    
    
    return "";
  };

  let populateContextMenu = function (ev) {
    let $this = $(this);

    let menu = $(".react-contextmenu--visible")
    let title = $this.find(".tracklist-name");
    let artist = $this.find(".artists-album span");
    if(artist.length === 0) {
      if($this.find(".second-line").length !== 0) {
      	artist = $this.find(".second-line"); // in playlist
      }
      
      if($this.parents(".now-playing").length !== 0) {
        // Now playing bar
        $this = $($this.parents(".now-playing")[0]);
				if($this.find(".track-info__artists").length !== 0) {
        	artist = $this.find(".track-info__artists");
      	} 
      }
      
    }

    if (title && artist && menu[0]) {
      let title_text = getSongTitle(title);
      let artist_text = getArtistName(artist);
      
      if(!title_text || !artist_text) {
        return; 
      }
      

      // Create context menu entry
      let entry = menu.find(".gmcopytrackinfo");
      if (!entry[0]) {
        entry = $('<div class="react-contextmenu-item gmcopytrackinfo" role="menuitem" tabindex="-1" aria-disabled="false">Copy track info</div>').appendTo(menu).click(function (ev) {
          // Copy string to clipboard
          let s = entry.data("gmcopy");
          if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(s);
          }
          else if (GM.setClipboard) {
            GM.setClipboard(s);
          }
          alert("Copied:\n" + s);
          window.dispatchEvent(new window.CustomEvent('REACT_CONTEXTMENU_HIDE'));
        }); 
      }
      entry.data("gmcopy", artist_text + " - " + title_text);
    }
  };

  let onContextMenu = function (ev) {
    // Wait for the React context menu to open
    let t = this;
    window.setTimeout(function () {
      populateContextMenu.call(t, ev);
    }, 200);
  };

  let bindEvents = function () {
    // Remove all events and then reattach them
    $(".react-contextmenu-wrapper").unbind(".gmcopytrackinfo").bind("contextmenu.gmcopytrackinfo", onContextMenu);

  };
  
  window.setTimeout(bindEvents, 500);

  window.setInterval(bindEvents, 3000);

})();
