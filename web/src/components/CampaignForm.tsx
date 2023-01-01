import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { object, string } from "zod";
import { trpc } from "@/utils/trpc";

export const CreateCampaignSchema = object({
  shortId: string().min(6).max(6),
  url: string().url(),
});

export function NewCampaignForm() {
  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const { mutate } = trpc.redirectRouter.create.useMutation();

  function handleSubmit(values: typeof form["values"]) {
    //  mutate(values);
  }

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput withAsterisk label="Name" {...form.getInputProps("name")} />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
