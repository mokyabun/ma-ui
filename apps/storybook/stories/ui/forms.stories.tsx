import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@ma-ui/registry/ui/button"
import { Checkbox } from "@ma-ui/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@ma-ui/registry/ui/field"
import { Input } from "@ma-ui/registry/ui/input"
import { RadioGroup, RadioGroupItem } from "@ma-ui/registry/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ma-ui/registry/ui/select"
import { Slider } from "@ma-ui/registry/ui/slider"
import { Switch } from "@ma-ui/registry/ui/switch"
import { Textarea } from "@ma-ui/registry/ui/textarea"

const meta = {
  title: "UI/Forms",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const fruits = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

export const Form: Story = {
  render: () => (
    <form className="w-80">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
          <FieldDescription>
            We&apos;ll never share your email.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Fruit</FieldLabel>
          <Select items={fruits}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" placeholder="Type your message here." />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="terms" defaultChecked />
          <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="notifications" />
          <FieldLabel htmlFor="notifications">Email notifications</FieldLabel>
        </Field>
        <FieldSet>
          <FieldLegend variant="label">Plan</FieldLegend>
          <RadioGroup defaultValue="pro">
            {["free", "pro", "team"].map((plan) => (
              <Field key={plan} orientation="horizontal">
                <RadioGroupItem value={plan} id={`plan-${plan}`} />
                <FieldLabel htmlFor={`plan-${plan}`} className="capitalize">
                  {plan}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
        <Field>
          <FieldLabel>Volume</FieldLabel>
          <Slider defaultValue={[50]} max={100} />
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  ),
}

export const InvalidAndDisabled: Story = {
  render: () => (
    <FieldGroup className="w-80">
      <Field data-invalid>
        <FieldLabel htmlFor="invalid">Invalid</FieldLabel>
        <Input id="invalid" aria-invalid defaultValue="not-an-email" />
        <FieldDescription>Enter a valid email address.</FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
        <Input id="disabled" disabled placeholder="Disabled" />
      </Field>
    </FieldGroup>
  ),
}
