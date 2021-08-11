export const fontMayaSamuelsExtraLight = {
  fontFamily: 'MayaSamuelsExtraLight',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('MayaSamuels-ExtraLight'),
    url('${process.env.PUBLIC_URL}/fonts/maya-samuels-extralight.ttf') format('truetype')
  `,
}

export const fontMayaSamuelsLight = {
  fontFamily: 'MayaSamuelsLight',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('MayaSamuels-Light'),
    url('${process.env.PUBLIC_URL}/fonts/maya-samuels-light.ttf') format('truetype')
  `,
}
