import React from 'react';
import  Accordion  from './accordion-parts';
import faqsData from '../../fixtures/faqs';

export function Faqs() {
  return (
    <Accordion id='faq'>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      <Accordion.Frame>
        {faqsData.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Header>{item.header}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Frame>
    </Accordion>
  );
}
