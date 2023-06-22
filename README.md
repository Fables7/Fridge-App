# Fridge-App
Frontend for my Fridge App

This Fridge app is a hobby app I am creating in order to help reduce food wastage due to food expiring without notice.

This app's goal is to show all items in the Fridge with expiry dates and quantities so there is a central place where one can easily see what the next item 
to expire is.

# Open Food Facts API
This app uses Open Food Facts' api to collect food data from their database, primarily names of products associated to their barcode, any extra information would 
be provided through my app, such as quantity (cheese slices), expiry date, Image, remaining quantity etc.

# Images
Concerning the images of the products, my app will request only image urls from official images to maintain a neater display, in addition urls will save any need for storing unnecesary 
images into the database, as urls take up much less space.

# DISCLAIMER
As this apps main target is my Family, I have not attempted to make my database robust in the sense of managing who can upload images and edit products, however if the need to update this ever arises I will fix it accordingly, but for now I have decided that it is unnecessary.

# Things to add
- What can I make page (using soon to expire food)
- Setting recurring items
- Need to buy list
  
# Future code updates
- Need to change to Axios and REact Query instead of my existing Fetch requests to optimise app and follow better practices
