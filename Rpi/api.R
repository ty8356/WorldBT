#install.packages("plumber")

library(plumber)

#* Revert back the input
#* @param msg Input a message to revert
#* @get /revert
revert <- function(msg = "")
{
  list(msg = paste0("The input message is: ", 
                    msg, "'"))
}

#* Plotting a bar graph
#* @png
#* @get /plot
function(){
  normal_func <- rnorm(60)
  barplot(normal_func)
}