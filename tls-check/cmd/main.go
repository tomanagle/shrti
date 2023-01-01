package main

import (
	"fmt"
	"net/http"
)

func main() {

	allowedDomains := []string{"shrti.xyz", "shrti.io"}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == "GET" {

			q := r.URL.Query()

			for _, domain := range allowedDomains {
				if q.Get("domain") == domain {
					w.WriteHeader(http.StatusOK)
					fmt.Fprintf(w, "OK")
					return
				}
			}

			w.WriteHeader(http.StatusNotFound)
			return
		}

	})

	fmt.Println("Listening on port 5555...")

	panic(http.ListenAndServe(":5555", nil))

}
