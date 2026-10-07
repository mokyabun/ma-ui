import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@ma-ui/registry/ui/badge"
import { Button } from "@ma-ui/registry/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ma-ui/registry/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ma-ui/registry/ui/tabs"

const meta = {
  title: "UI/Layout",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
  name: "Card",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Starter plan</CardTitle>
        <CardDescription>Everything you need to get going.</CardDescription>
        <CardAction>
          <Badge variant="soft" color="success">
            Active
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-base-content/60">
        3 projects · 10 GB storage · Email support
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Upgrade</Button>
        <Button variant="outline">Manage</Button>
      </CardFooter>
    </Card>
  ),
}

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {["overview", "analytics", "settings"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{tab}</CardTitle>
              <CardDescription>Content for the {tab} tab.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  ),
}
