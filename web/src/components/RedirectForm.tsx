import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { customAlphabet } from "nanoid";
import { useForm } from "@mantine/form";
import { object, string } from "zod";
import { trpc } from "@/utils/trpc";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export const CreateRedirectSchema = object({
  shortId: string().min(6).max(6),
  url: string().url(),
});

export function NewRedirectForm() {
  const form = useForm({
    initialValues: {
      shortId: nanoid(),
      url: "https://google.com",
    },
  });

  const { mutate } = trpc.redirect.create.useMutation();

  function handleSubmit(values: typeof form["values"]) {
    mutate(values);
  }

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Unique ID"
          {...form.getInputProps("shortId")}
        />

        <TextInput
          withAsterisk
          label="Redirect to"
          placeholder="https://example.com"
          type="url"
          {...form.getInputProps("url")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
