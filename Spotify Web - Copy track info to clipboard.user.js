// ==UserScript==
// @name          Spotify Web - Copy track info to clipboard
// @description   Adds an entry in the context menu that copies the selected song name and artist to the clipboard
// @namespace     https://openuserjs.org/users/cuzi
// @version       4
// @license       MIT
// @copyright     2017, cuzi (https://openuserjs.org/users/cuzi)
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant         GM.setClipboard
// @grant         GM_setClipboard
// @include       https://open.spotify.com/*
// ==/UserScript==

// ==OpenUserJS==
// @author       cuzi
// ==/OpenUserJS==

/* globals $, GM, GM_setClipboard */

'use strict';

(function () {
  let showInfoID
  const showInfo = function (str) {
    window.clearTimeout(showInfoID)
    if (!document.getElementById('copied_song_info_outer')) {
      document.head.appendChild(document.createElement('style')).innerHTML = '#copied_song_info_outer {z-index: 100;height:0;margin: -62px auto 0;padding-bottom: 62px;pointer-events: none;display: inline-block;}#copied_song_info_inner {max-width: none;display: inline-block;background: #2e77d0;border-radius: 8px;box-shadow: 0 4px 12px 4px rgba(0,0,0,.5);color: #fff;font-size: 16px;line-height: 20px;max-width: 450px;opacity: 1;padding: 12px 36px;text-align: center;transition: none .5s cubic-bezier(.3,0,.4,1);transition-property: opacity;}'
      $('<div id="copied_song_info_outer"><div id="copied_song_info_inner"></div></div>').insertAfter('.Root__main-view>div:first-child')
    }
    const copiedSongInfoOuter = $('#copied_song_info_outer')
    const copiedSongInfoInner = $('#copied_song_info_inner')

    copiedSongInfoOuter.css('display', 'inline-block')
    copiedSongInfoInner.css('opacity', 1)
    copiedSongInfoInner.html(str.replace('\n', '<br>\n'))

    showInfoID = window.setTimeout(function () {
      copiedSongInfoInner.css('opacity', 0)
      showInfoID = window.setTimeout(function () {
        copiedSongInfoOuter.css('display', 'none')
      }, 700)
    }, 4000)
  }

  const getSongTitle = function ($titlenodes) {
    let titleText

    if ($titlenodes) {
      titleText = $titlenodes.text()
      if (titleText && titleText.trim()) {
        return titleText.trim()
      }
    }

    if ($('.track-info__name')) {
      titleText = $('.track-info__name')[0].innerText
      if (titleText && titleText.trim()) {
        return titleText.trim()
      }
    }

    return ''
  }

  const getArtistName = function ($artistnodes) {
    let artistText

    if ($artistnodes) {
      artistText = $artistnodes.not((i, e) => e.className).text()
      if (artistText && artistText.trim()) {
        return artistText.trim()
      }

      // In playlist:
      if ($artistnodes.find('.ellipsis-one-line').length > 0) {
        artistText = $artistnodes.find('.ellipsis-one-line')[0].innerText
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      }

      // Something else, just accumulate all artist links: <a href="/artist/ARTISTID">Artistname</a>
      if ($artistnodes.find('a[href^="/artist/"]').length > 0) {
        return $.map($artistnodes.find('a[href^="/artist/"]'), (element) => $(element).text().trim()).join(', ')
      }
    }

    if (document.location.pathname.startsWith('/artist/')) {
      artistText = $('header h1').text()
      if (artistText && artistText.trim()) {
        return artistText.trim()
      }
    }

    if (document.location.pathname.startsWith('/album/')) {
      artistText = $('.media-object .mo-meta').text()
      if (artistText && artistText.trim()) {
        return artistText.trim()
      }
    }

    if ($('.track-info__artists')) {
      artistText = $('.track-info__artists')[0].innerText
      if (artistText && artistText.trim()) {
        return artistText.trim()
      }
    }

    return ''
  }

  const populateContextMenu = function (ev) {
    let $this = $(this)

    const menu = $('.react-contextmenu--visible')
    const title = $this.find('.tracklist-name')
    let artist = $this.find('.artists-album span')
    if (artist.length === 0) {
      if ($this.find('.second-line').length !== 0) {
        artist = $this.find('.second-line') // in playlist
      }
      if ($this.parents('.now-playing').length !== 0) {
        // Now playing bar
        $this = $($this.parents('.now-playing')[0])
        if ($this.find('.track-info__artists').length !== 0) {
          artist = $this.find('.track-info__artists')
        }
      }
    }

    if (title && artist && menu[0]) {
      const titleText = getSongTitle(title)
      const artistText = getArtistName(artist)

      if (!titleText || !artistText) {
        return
      }

      // Create context menu entry
      let entry = menu.find('.gmcopytrackinfo')
      if (!entry[0]) {
        entry = $('<div class="react-contextmenu-item gmcopytrackinfo" role="menuitem" tabindex="-1" aria-disabled="false">Copy track info</div>').appendTo(menu).click(function (ev) {
          // Copy string to clipboard
          const s = entry.data('gmcopy')
          if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(s)
          } else if (GM.setClipboard) {
            GM.setClipboard(s)
          }
          showInfo('Copied:\n' + s)
          window.dispatchEvent(new window.CustomEvent('REACT_CONTEXTMENU_HIDE'))
        })
      }
      entry.data('gmcopy', artistText + ' - ' + titleText)
    }
  }

  const onContextMenu = function (ev) {
    // Wait for the React context menu to open
    const t = this
    window.setTimeout(function () {
      populateContextMenu.call(t, ev)
    }, 200)
  }

  const bindEvents = function () {
    // Remove all events and then reattach them
    $('.react-contextmenu-wrapper').unbind('.gmcopytrackinfo').bind('contextmenu.gmcopytrackinfo', onContextMenu)
  }

  window.setTimeout(bindEvents, 500)

  window.setInterval(bindEvents, 3000)
})()