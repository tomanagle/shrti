package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {

		// get host from request
		h := c.Hostname()

		return c.SendString("Hello, you are looking at host: " + h)
	})

	app.Listen(":4000")
}
