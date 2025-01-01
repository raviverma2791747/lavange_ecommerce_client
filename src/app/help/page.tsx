import Breadcrumb from '@/components/ui/Breadcrumb'
import { PUBLIC_COMPANY_TIMINGS, PUBLIC_COMPAY_ADDRESS, PUBLIC_SOCIAL_EMAIL, PUBLIC_SOCIAL_MOBILE } from '@/secrets';
import { helpConfigService } from '@/services';
import { model } from '@/types/model';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import * as Accordion from "@radix-ui/react-accordion";
import React from 'react'

const HelpPage = async () => {
    const initHelpConfig = async () => {
        const response = await helpConfigService.getOne();
        if (response && response.status === 200) {
            return response.data.helpConfig as model.IHelpConfig ?? null;
        }
        return null;
    }
    const helpConfig: model.IHelpConfig | null = await initHelpConfig();

    if (!helpConfig) return <div>Help not found</div>;

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 mb-4 mt-4">
            <Breadcrumb
                routes={[
                    {
                        name: "Help",
                        path: "/help",
                    },
                ]}
            />
            <div className="grid lg:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <h2 className="font-semibold text-xl mb-2">Call us Queries</h2>
                    <p>
                        Helpdesk: {PUBLIC_SOCIAL_MOBILE}
                        <br />
                        {PUBLIC_COMPANY_TIMINGS}
                    </p>
                </div>
                <div className="text-center">
                    <h2 className="font-semibold text-xl mb-2">E-Mail Us</h2>
                    <p>
                        Sales enquiries and customer support: {PUBLIC_SOCIAL_EMAIL}
                    </p>
                </div>
                <div className="text-center">
                    <h2 className="font-semibold text-xl mb-2">Postal Address</h2>
                    <p>
                        {PUBLIC_COMPAY_ADDRESS}
                    </p>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-3xl mb-4 text-center">FAQ</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {
                        helpConfig.topics.map((topic, index: number) => <div key={index}>
                            <h3 className="text-xl font-semibold mb-4 text-center">{topic.title}</h3>
                            <Accordion.Root type='single' className="w-full">
                                {
                                    topic.faqs.map((item, i: number) => <Accordion.Item
                                        key={i}
                                        value={"item-" + i}
                                        className="group border-b border-dark-10 px-1.5"
                                    >
                                        <Accordion.Header>
                                            <Accordion.Trigger
                                                className="font-semibold flex w-full flex-1 items-center justify-between py-5 text-[15px]  transition-all [&[data-state=open]>span>svg]:rotate-180 "
                                            >
                                                {item.question}
                                                <span
                                                    className="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                                                >
                                                    <CaretDown className="size-[18px] transition-all duration-200" />
                                                </span>
                                            </Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Content
                                            //transition={slide}
                                            //transitionConfig={{ duration: 200 }}
                                            className="pb-[25px]  tracking-[-0.01em]"

                                        >
                                            <p dangerouslySetInnerHTML={{ __html: item.answer }}>

                                            </p>
                                        </Accordion.Content>
                                    </Accordion.Item>)
                                }
                            </Accordion.Root>
                        </div>

                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default HelpPage