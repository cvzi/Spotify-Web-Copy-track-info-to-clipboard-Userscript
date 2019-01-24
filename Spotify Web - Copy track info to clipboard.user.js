// ==UserScript==
// @name          Spotify Web - Copy track info to clipboard
// @description   Adds an entry in the context menu that copies the selected song name and artist to the clipboard
// @namespace     https://openuserjs.org/users/cuzi
// @updateURL     https://openuserjs.org/meta/cuzi/Spotify_Web_-_Copy_track_info_to_clipboard.meta.js
// @version       1
// @license       MIT
// @copyright     2017, cuzi (https://openuserjs.org/users/cuzi)
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
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
    
    title_text = $(".track-info__name").text();
    if(title_text && title_text.trim()) {
      return title_text.trim();
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
       
    artist_text = $(".track-info__artists").text();
    if(artist_text && artist_text.trim()) {
      return artist_text.trim();
    }
    
    return "";
  };

  let populateContextMenu = function (ev) {
    let $this = $(this);

    let menu = $(".react-contextmenu--visible")
    let title = $this.find(".tracklist-name");
    let artist = $this.find(".artists-album span");

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

  window.setInterval(bindEvents, 4000);

})();
