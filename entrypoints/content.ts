export default defineContentScript({
  matches: ['https://radiko.jp/*'],
  main() {
    const observer = new MutationObserver(process)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    process()
  },
})

function process() {
  // サイドバー
  for (const element of document.querySelectorAll('.noa-item')) {
    addSpotifyLink(element, {
      title: '.noa-item__title',
      artist: '.noa-item__name',
      linkGroup: '.noa-item__link.group',
    })
  }

  // フッター
  for (const element of document.querySelectorAll('.tune-list__item')) {
    addSpotifyLink(element, {
      title: '.tune-list__title',
      artist: '.tune-list__name',
      linkGroup: '.tune-list__link.group',
    })
  }
}

type Selectors = {
  title: string
  artist: string
  linkGroup: string
}

function addSpotifyLink(element: Element, selectors: Selectors) {
  if (element.hasAttribute('data-spotify-link-added')) {
    return
  }

  // TODO: 半角化
  const trackTitle = element.querySelector(selectors.title)?.textContent?.trim()
  const trackArtist = element.querySelector(selectors.artist)?.textContent?.trim()
  if (!trackTitle || !trackArtist) {
    return
  }

  const linkGroup = element.querySelector(selectors.linkGroup)
  if (!linkGroup) {
    return
  }

  const li = document.createElement('li')
  {
    li.classList.add('item')

    const a = document.createElement('a')
    {
      a.classList.add('btn', 'btn--spotify')
      a.target = '_blank'
      // TODO: 検索APIを使う
      a.href = `https://open.spotify.com/search/${encodeURIComponent(`${trackTitle} ${trackArtist}`)}`

      const img = document.createElement('img')
      {
        img.src = browser.runtime.getURL('/listen_on_spotify.png')
        img.alt = 'Listen on Spotify'
        img.width = 100
      }
      a.appendChild(img)
    }
    li.appendChild(a)
  }
  linkGroup.prepend(li)

  element.setAttribute('data-spotify-link-added', 'true')
}
