const createSongOrArtistObject = (scrapedData) => {
    const {name, lyrics, artist, originalLang } = scrapedData.body
    const filteredValues = {}
    
    if (name !== undefined){
      filteredValues.name = name
    }
    if (lyrics !== undefined){
      filteredValues.lyrics = lyrics
    }
    if (artist !== undefined){
      filteredValues.artist = artist
    }
    if (originalLang !== undefined){
      filteredValues.originalLang = originalLang
    }
    
    const newSongObject = {
        name: {
        hebrew: name.hebrew,
         arabic:name.arabic,
          english:name.english.toLowerCase()
        },
      lyrics: {
        hebrew: lyrics.hebrew,
         arabic:lyrics.arabic,
          english:lyrics.english
        },
      originalLang,
      artist
    }
    return newSongObject
}


const createSearchFilterObject = (req) => {
    const {name, album, artist} = req.body
    const filter = {};

    if (name !== undefined){
        filter.name.hebrew = name
        filter.name.arabic = name
        filter.name.english = name.toLowerCase()
    }
    if(album !== undefined){
        filter.album = album.toLowerCase()
    }
    if(artist !== undefined){
        filter.artist.name.hebrew = artist
        filter.artist.name.arabic = artist
        filter.artist.name.english = artist.toLowerCase()
    }
    return filter
}


export {createSongOrArtistObject, createSearchFilterObject}