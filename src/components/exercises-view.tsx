"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InnerChildExercise } from "@/components/exercises/inner-child";
import { FeelingsWheel } from "@/components/exercises/feelings-wheel";
import { TriggerLogView } from "@/components/exercises/trigger-log";
import { AffirmationsView } from "@/components/exercises/affirmations";

export function ExercisesView() {
  return (
    <Tabs defaultValue="inner-child">
      <TabsList className="mb-6 flex-wrap">
        <TabsTrigger value="inner-child">Inner Child Dialogue</TabsTrigger>
        <TabsTrigger value="feelings">Feelings Wheel</TabsTrigger>
        <TabsTrigger value="trigger">Trigger Log</TabsTrigger>
        <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
      </TabsList>
      <TabsContent value="inner-child">
        <InnerChildExercise />
      </TabsContent>
      <TabsContent value="feelings">
        <FeelingsWheel />
      </TabsContent>
      <TabsContent value="trigger">
        <TriggerLogView />
      </TabsContent>
      <TabsContent value="affirmations">
        <AffirmationsView />
      </TabsContent>
    </Tabs>
  );
}
