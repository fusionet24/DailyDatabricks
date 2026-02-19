library(brickster)
library(DBI)

# Load .env file if it exists (mirrors Python's python-dotenv behaviour)
# Walk up from working directory to find .env
find_env_file <- function() {
  dir <- getwd()
  while (dir != dirname(dir)) {
    candidate <- file.path(dir, ".env")
    if (file.exists(candidate)) return(candidate)
    dir <- dirname(dir)
  }
  NULL
}

env_file <- find_env_file()
if (!is.null(env_file)) {
  readRenviron(env_file)
}

#' Get a DBI connection to Databricks via brickster
#'
#' Reads DATABRICKS_HOST and DATABRICKS_TOKEN from environment variables.
#' If DATABRICKS_WAREHOUSE_ID is set, uses it directly. Otherwise,
#' auto-discovers the first available SQL warehouse.
#'
#' @param warehouse_id SQL Warehouse ID (optional — auto-discovers if not set)
#' @return A DBI connection object
get_databricks_connection <- function(warehouse_id = Sys.getenv("DATABRICKS_WAREHOUSE_ID")) {
  if (nchar(warehouse_id) == 0) {
    message("DATABRICKS_WAREHOUSE_ID not set, discovering warehouses...")
    warehouses <- db_sql_warehouse_list()
    if (length(warehouses) == 0) {
      stop("No SQL Warehouses found. Create one in the Databricks UI.")
    }
    warehouse_id <- warehouses[[1]]$id
    message("Using warehouse: ", warehouses[[1]]$name, " (", warehouse_id, ")")
  }
  dbConnect(
    DatabricksSQL(),
    warehouse_id = warehouse_id
  )
}
