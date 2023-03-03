package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

func main() {
	http.HandleFunc("/api/v0/convert", convertHandler)
	http.HandleFunc("/version", versionHandler)
	http.Handle("/", http.FileServer(http.Dir("/root/.butane/html")))

	http.ListenAndServe(":8080", nil)
}

func versionHandler(w http.ResponseWriter, r *http.Request) {

	// set header
	w.Header().Set("Content-Type", "application/json")

	// get butane versinon
	butaneVersion := "n. a."

	cmd := exec.Command("butane", "--version")
	stdout, err := cmd.Output()

	if err == nil {
		butaneVersion = string(stdout)
	} else {
		log.Println(err)
	}

	// create response json
	resp := make(map[string]string)

	resp["appName"] = "Butane Converter"
	resp["appVersion"] = os.Getenv("VERSION")
	resp["butaneVersion"] = butaneVersion

	// marshal and return
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
}

func convertHandler(w http.ResponseWriter, r *http.Request) {

	// check method
	if r.Method != "POST" {
		http.Error(w, "Method not allowed.", http.StatusMethodNotAllowed)
		return
	}

	// get request
	log.Println("A new converting request has been received...")

	body, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	log.Println("Butane Spec has been read...")

	// write to temp file
	file, err := ioutil.TempFile(os.TempDir(), "butan-api")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = ioutil.WriteFile(file.Name(), body, 0644)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Butane Spec has been written to a temporarily file " + file.Name())

	// process butan spec using command line
	cmd := exec.Command("butane", "--pretty", "--strict", file.Name())

	var stdout bytes.Buffer
	var stderr bytes.Buffer

	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	errCmd := cmd.Run()
	if errCmd != nil {
		log.Println("Butane Conversion Issue: " + stderr.String())
		http.Error(w, stderr.String(), 400)
		return
	}

	strIgnition := stdout.String()
	log.Println("Ignition spec has been generated from " + file.Name() + ". Start post-processing...")

	// post processing
	strIgnition = strings.ReplaceAll(strIgnition, "%24%7B", "${")
	strIgnition = strings.ReplaceAll(strIgnition, "%7D", "}")

	// remove temporarily file
	defer os.Remove(file.Name())

	// return processed input
	log.Println("Return processed Ignition spec")
	fmt.Fprint(w, strIgnition)
}
