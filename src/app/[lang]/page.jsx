"use client";
import useTranslation from "next-translate/useTranslation";
import { ToolCard, ToolCardGroup } from "@/components/ToolCard";
import {
  analyzer_config,
  database_config,
  visualizer_config,
} from "../../../config/tools";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import {
  AnalyzerIcon,
  DatabaseIcon,
  VisualizerIcon,
} from "../../../public/icons/HomeIcons";

export default function Home() {
  const { t, lang } = useTranslation("common");
  return (
    <>
      <div className="mt-5 mb-2 lg:w-2/3 mx-3 md:mx-auto">
        <h2 className="font-black text-3xl">{t("tools")}</h2>
        <small>Analyze, Visualize, and Explore the world</small>
      </div>
      <div className="my-5 lg:w-2/3 mx-auto flex gap-1">
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Analyzer"
            startContent={<AnalyzerIcon className="text-primeary" />}
            title={
              <h3 className="font-bold text-lg text-primary-600">Analyzer</h3>
            }
          >
            <ToolCardGroup>
              {analyzer_config.map((item, index) => (
                <ToolCard key={index} tool_info={item}></ToolCard>
              ))}
            </ToolCardGroup>
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Visualizer"
            startContent={<VisualizerIcon className="text-secondary" />}
            title={
              <h3 className="font-bold text-lg text-secondary-600">
                Visualizer
              </h3>
            }
          >
            <ToolCardGroup>
              {visualizer_config.map((item, index) => (
                <ToolCard key={index} tool_info={item}></ToolCard>
              ))}
            </ToolCardGroup>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Database"
            startContent={<DatabaseIcon className="text-success" />}
            title={
              <h3 className="font-bold text-lg text-success-600">Database</h3>
            }
          >
            <ToolCardGroup>
              {database_config.map((item, index) => (
                <ToolCard key={index} tool_info={item}></ToolCard>
              ))}
            </ToolCardGroup>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex-auto"></div>
    </>
  );
}
