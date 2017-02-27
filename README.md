# chinga-la-migra
This is an open map for marking police/I.C.E./homeland security checkpoints. While not the best/safest solution to the problem, it does provide
a quick-and-easy way for anyone to add the to an already-existing website. Chinga-La-Migra is entirely front end and is designed to work out-of-the-box, regardless of your back end.

Because anyone can click on the map to add checkpoints and the API is public, it's best to share the URL with only people
you trust and keep it off social media.



##Installation

    git clone https://github.com/crashspringfield/chinga-la-migra/
    set up public API and image uploading capabilities
    attach to any site as-if

## Setup for public API
  1. Sign up at Mlabs.com
  2. Create a database and collection (I use "checkpoints" for both)
  3. Create and [enable](http://docs.mlab.com/data-api/#authentication) a public API key
  4. Update the GET and POST requests in [map-service.js](https://github.com/crashspringfield/chinga-la-migra/blob/master/js/map-service.js)
    For example: https://api.mlab.com/api/1/databases/database_name/collection_name?apiKey=your_API_key
    (replace datebase_name, collection_name, and your_APY_key)

## Setup for image uploading
  1. Sign up at Cloudinary.com
  2. Add your "Cloud Name" to line 80 of [map-controller.js](https://github.com/crashspringfield/chinga-la-migra/blob/master/js/map-controller.js)
  3. Enable uploading for unsigned photos and add your "Upload Preset" to line 84 of [map-controller.js](https://github.com/crashspringfield/chinga-la-migra/blob/master/js/map-controller.js)

## Contributing

We're currently working on a Spanish translation for the right side of the page. Another soon-to-be-added capability is
photo-verification of checkpoints.
