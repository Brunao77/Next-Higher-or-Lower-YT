export const getRandomItems = (length) => (array) => {
  return array
    .sort(() => Math.round(Math.random() * -1))
    .slice(0, length ?? array.length)
}

export const selectRandomVideo = (videos, played) => {
  let video
  do {
    video = getRandomItems(1)(videos)
  } while (played.includes(video[0]) && played.length < 50)

  return played.length < videos.length && [video[0], ...played]
}
