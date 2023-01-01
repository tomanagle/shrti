package main

import (
	"fmt"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == "GET" {

			q := r.URL.Query()

			if q.Get("domain") == "tomdoestech.com" {
				w.WriteHeader(http.StatusOK)
				fmt.Fprintf(w, "OK")
				return
			}

			w.WriteHeader(http.StatusNotFound)
			return
		}

	})

	fmt.Println("Listening on port 5555...")

	panic(http.ListenAndServe(":5555", nil))

}
