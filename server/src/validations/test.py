import cv2 
  
# Reading the image using imread() function
image = cv2.imread('server/src/validations/halo.png')
  
# Displaying the original BGR image
cv2.imshow('Original_Image', image)
  
# Using cv2.split() to split channels of coloured image 
b,g,r = cv2.split(image)
  
# Displaying Blue channel image
# Blue colour is highlighted the most
cv2.imshow("Model Blue Image", b)
  
# Displaying Green channel image
# Green colour is highlighted the most
cv2.imshow("Model Green Image", g)
  
# Displaying Red channel image
# Red colour is highlighted the most
cv2.imshow("Model Red Image", r)
  
# Waits for user to press any key
cv2.waitKey(0)