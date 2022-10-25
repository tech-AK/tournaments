module.exports = {
  images: {
    loader: 'akamai',
    // just using a invalid path here in order to disable the image optimization of NextJS (we have only one image as logo which does not need to be super-optimized)
    // only if we turn off optimization, we can deploy this app via "next export"
    path: '',
  },
  reactStrictMode: true,
}
