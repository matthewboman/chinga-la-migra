# chinga-la-migra
This is an open map for marking I.C.E. checkpoints. While not the best/safest solution to the problem, it does provide
a quick-and-easy way for anyone to add the to an already-existing website.
Because anyone can click on the map to add checkpoints and the API is public, it's best to share the URL with only people
you trust and keep it off social media.

##Installation

    git clone https://github.com/crashspringfield/chinga-la-migra/

## Setup for creating a public API
  1. Sign up at Mlabs.com
  2. Create a database and collection (I use "checkpoints" for both)
  3. Create and [enable](http://docs.mlab.com/data-api/#authentication) a public API key
  4. Update the GET and POST requests in [map-service.js](https://github.com/crashspringfield/chinga-la-migra/blob/master/js/map-service.js)
    For example: https://api.mlab.com/api/1/databases/database_name/collection_name?apiKey=your_API_key
    (replace datebase_name, collection_name, and your_APY_key)
  5. Upload to a hidden place on an already-hosted webpage. 

## Contributing

We're currently working on a Spanish translation for the right side of the page. Another soon-to-be-added capability is 
photo-verification of checkpoints.
