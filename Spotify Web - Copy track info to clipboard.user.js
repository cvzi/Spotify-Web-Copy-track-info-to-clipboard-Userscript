// ==UserScript==
// @name                 Spotify Web - Copy track info to clipboard
// @name:es              Spotify Web - Copiar info de la canción
// @name:pt              Spotify Web - Copiar info da canción
// @name:it              Spotify Web - Copia l'informazione sul brano
// @name:fr              Spotify Web - Copier les informations de titre
// @name:zh-TW           Spotify Web - 複製歌曲信息
// @name:zh-CN           Spotify Web - 复制歌曲信息
// @name:zh              Spotify Web - 复制歌曲信息
// @name:ar              Spotify Web - انسخ معلومات الأغنية
// @name:iw              Spotify Web - העתקת מידע השיר
// @name:ru              Spotify Web - Копировать данные трека
// @name:id              Spotify Web - Salin Informasi Lagu
// @name:ms              Spotify Web - Salin Maklumat Lagu
// @name:de              Spotify Web - Songinformation kopieren
// @name:ja              Spotify Web - 曲情報をコピー
// @name:pl              Spotify Web - Skopiuj informacje o utworze
// @name:cs              Spotify Web - Kopírovat informace o skladbě
// @name:el              Spotify Web - Αντιγραφή πληροφοριών τραγουδιού
// @name:hu              Spotify Web - Dal adat másolása
// @name:tr              Spotify Web - Şarkı Bilgilerini Kopyala
// @name:th              Spotify Web - คัดลอกข้อมูลเพลง
// @name:vi              Spotify Web - Sao chép Thông tin Bài hát
// @name:sv              Spotify Web - Kopiera sånginfoen
// @name:nl              Spotify Web - Info van nummer kopiëren
// @description          Adds an entry in the context menu that copies the selected song name and artist to the clipboard
// @description:es       Agrega una entrada en el menú contextual que copia el nombre de la canción y el artista seleccionados al portapapeles
// @description:pt       Adiciona uma entrada no menu de contexto que copia o nome da música selecionada e o artista para a área de transferência
// @description:it       Aggiunge una voce nel menu contestuale che copia il nome del brano e l'artista selezionati negli appunti
// @description:fr       Ajoute une entrée dans le menu contextuel qui copie le nom de la chanson et l'artiste sélectionnés dans le presse-papiers
// @description:zh-TW    在上下文菜單中添加一個條目，該條目將選定的歌曲名稱和歌手複製到剪貼板
// @description:zh-CN    在上下文菜单中添加一个条目，将选定的歌曲名称和歌手复制到剪贴板
// @description:zh       在上下文菜单中添加一个条目，将选定的歌曲名称和歌手复制到剪贴板
// @description:ar       أضف إدخالاً في قائمة السياق ينسخ اسم الأغنية والفنان المحدد إلى الحافظة
// @description:iw       הוסף ערך בתפריט ההקשר שמעתיק ללוח הלוח את שם השיר והאמן שנבחרו
// @description:ru       Добавить пункт контекстного меню, копирующий имя выбранной песни и исполнителя в буфер обмена.
// @description:id       Tambahkan entri menu konteks yang menyalin nama lagu dan artis yang dipilih ke clipboard
// @description:ms       Tambahkan entri menu konteks yang menyalin nama lagu dan artis yang dipilih ke papan keratan
// @description:de       Fügt einen Eintrag im Kontextmenü hinzu, der den ausgewählten Songnamen und Interpreten in die Zwischenablage kopiert
// @description:ja       選択した曲名とアーティストをクリップボードにコピーするエントリをコンテキストメニューに追加します
// @description:pl       Dodaje wpis w menu kontekstowym, który kopiuje wybrany tytuł utworu i wykonawcę do schowka
// @description:cs       Přidá položku do místní nabídky, která zkopíruje název vybrané skladby a umělce do schránky
// @description:el       Προσθέτει μια καταχώριση στο μενού περιβάλλοντος που αντιγράφει το επιλεγμένο όνομα τραγουδιού και τον καλλιτέχνη στο πρόχειρο
// @description:hu       Hozzáad egy bejegyzést a helyi menübe, amely átmásolja a kiválasztott dal nevét és előadót a vágólapra
// @description:tr       Bağlam menüsüne seçili şarkı adını ve sanatçıyı panoya kopyalayan bir giriş ekler
// @description:th       เพิ่มรายการในเมนูบริบทที่คัดลอกชื่อเพลงและศิลปินที่เลือกไปยังคลิปบอร์ด
// @description:vi       Thêm một mục vào menu ngữ cảnh để sao chép tên bài hát và nghệ sĩ đã chọn vào khay nhớ tạm
// @description:sv       Lägger till en post i snabbmenyn som kopierar det valda låtnamnet och artisten till Urklipp
// @description:nl       Voegt een item toe aan het contextmenu dat de geselecteerde songnaam en artiest naar het klembord kopieert
// @namespace            https://openuserjs.org/users/cuzi
// @icon                 https://open.spotify.com/favicon.ico
// @version              8
// @license              MIT
// @copyright            2020, cuzi (https://openuserjs.org/users/cuzi)
// @require              https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant                GM.setClipboard
// @grant                GM_setClipboard
// @include              https://open.spotify.com/*
// ==/UserScript==

// ==OpenUserJS==
// @author       cuzi
// ==/OpenUserJS==

/* globals $, GM, GM_setClipboard */

'use strict';

(function () {
  const translations = {
    en: ['Copy track info', 'Copied: %s'],
    es: ['Copiar info de la canción', 'Copiado: %s'],
    pt: ['Copiar info da canción', 'Copiado: %s'],
    it: ['Copia l\'informazione', 'Copiato: %s'],
    fr: ['Copier les informations de titre', '%s copié'],
    'zh-HK': ['Copy track info', 'Copied: %s'],
    'zh-TW': ['複製歌曲信息', '已復制: %s'],
    zh: ['复制歌曲信息', '已複製: %s'],
    ar: ['انسخ معلومات الأغنية', '%s :تمّ نسخ'],
    iw: ['העתקת מידע השיר', '%s :הועתק'],
    ru: ['Копировать данные трека', 'Скопирована: %s'],
    id: ['Salin Informasi Lagu', 'Disalin: %s'],
    ms: ['Salin Maklumat Lagu', 'Disalin: %s'],
    de: ['Songinformation kopieren', '%s kopiert'],
    ja: ['曲情報をコピー', '%s をコピーしました'],
    pl: ['Skopiuj informacje o utworze', '%s skopiowano'],
    cs: ['Kopírovat informace o skladbě', '%s byl zkopírován'],
    el: ['Αντιγραφή πληροφοριών τραγουδιού', '%s αντιγράφηκε'],
    hu: ['Dal adat másolása', '%s másolva'],
    tr: ['Şarkı Bilgilerini Kopyala', '%s kopyalandı'],
    th: ['คัดลอกข้อมูลเพลง', '%s ไปที่คลิปบอร์ดแล้ว'],
    vi: ['Sao chép Thông tin Bài hát', '%s đã được sao chép'],
    sv: ['Kopiera sånginfoen', '%s kopierad'],
    nl: ['Info van nummer kopiëren', '%s gekopieerd']
  }
  let [menuString, copiedString] = translations.en
  for (const lang in translations) {
    if (navigator.language.startsWith(lang)) {
      [menuString, copiedString] = translations[lang]
      // console.log(lang + ' <- ' + navigator.language)
      break
    }
  }

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

    if ($titlenodes && $titlenodes.length > 0) {
      titleText = $titlenodes.text()
      if (titleText && titleText.trim()) {
        return titleText.trim()
      }
    }

    if ($('.track-info__name').length > 0) {
      titleText = $('.track-info__name')[0].innerText
      if (titleText && titleText.trim()) {
        return titleText.trim()
      }
    }

    return ''
  }

  const getArtistName = function ($artistnodes) {
    let artistText

    if (typeof $artistnodes === 'string') {
      return $artistnodes.trim()
    }

    if ($artistnodes) {
      const artistTextNodes = $artistnodes.not((i, e) => e.className)
      if (artistTextNodes.length === 1) {
        artistText = artistTextNodes.text()
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      } else if (artistTextNodes.length > 1) {
        artistText = artistTextNodes.map((i, e) => e.textContent.trim()).get()
        artistText = artistText.join(', ')
        return artistText.trim()
      }

      // In playlist:
      if ($artistnodes.find('.ellipsis-one-line').length > 0) {
        artistText = $artistnodes.find('.ellipsis-one-line')[0].innerText
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      }
      if ($artistnodes.find('.standalone-ellipsis-one-line').length > 0) {
        artistText = $artistnodes.find('.standalone-ellipsis-one-line')[0].innerText
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
      if ($('.content.artist>div h1').length > 0) {
        artistText = $('.content.artist>div h1')[0].textContent
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      } else {
        if ($('.Root__main-view h1').length > 0) {
          artistText = $('.Root__main-view h1')[0].textContent
          if (artistText && artistText.trim()) {
            return artistText.trim()
          }
        }
      }
    }

    if (document.location.pathname.startsWith('/album/')) {
      artistText = document.querySelector('.os-content h1').textContent
      if (artistText && artistText.trim()) {
        return artistText.trim()
      }
    }

    if ($('.track-info__artists').length > 0) {
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
    let title = $this.find('.tracklist-name')
    if (title.length === 0) {
      title = $this.find('div[data-testid="tracklist-row"] .standalone-ellipsis-one-line')
    }
    let artist = $this.find('.artists-album span')
    if (artist.length === 0) {
      if ($this.find('.second-line').length !== 0) {
        artist = $this.find('.second-line') // in playlist
      }
      if ($this.parents('.now-playing').length !== 0) {
        // Now playing bar
        $this = $($this.parents('.now-playing')[0])
        if ($this.find('.ellipsis-one-line a[href^="/artist/"]').length !== 0) {
          artist = $this.find('.ellipsis-one-line a[href^="/artist/"]')
          title = $this.find('a[data-testid="nowplaying-track-link"]')
        }
      }
      const artistGridCell = $this.find('*[role="gridcell"] a[href^="/artist/"]')
      if (artistGridCell.length > 0) {
        // New playlist design
        artist = artistGridCell.parent()
        title = $(artistGridCell.parent().parent().find('span')[0])
        if (artist.has(title)) {
          // title is child of artist, so it's the same node, the real title is somewhere else
          // This happens on album page
          if (artist.parent().parent().find('div.standalone-ellipsis-one-line').length) {
            title = $(artist.parent().parent().find('div.standalone-ellipsis-one-line')[0])
          }
        }
      }

      const artistContent = $('.content.artist>div h1')
      if (artistContent.length > 0) {
        // Artist page
        artist = artistContent[0].textContent
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
      if (entry.length === 0 || !entry[0]) {
        entry = $('<div class="react-contextmenu-item gmcopytrackinfo" role="menuitem" tabindex="-1" aria-disabled="false">' + menuString + '</div>').appendTo(menu).click(function (ev) {
          // Copy string to clipboard
          const s = entry.data('gmcopy')
          if (typeof GM_setClipboard !== 'undefined') { // eslint-disable-line camelcase
            GM_setClipboard(s)
          } else if (GM.setClipboard) {
            GM.setClipboard(s)
          } else {
            navigator.clipboard.writeText(s)
          }
          showInfo(copiedString.replace('%s', s))
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

  window.setInterval(bindEvents, 1000)
})()
