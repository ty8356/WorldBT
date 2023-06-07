# Loading package
library(plumber)

# print(list.files(path = "./Rpi/api.R"))

# Routing API
r <- plumb("./Rpi/api.R")

# Running API
r$run(port = 8000, swagger = TRUE)
