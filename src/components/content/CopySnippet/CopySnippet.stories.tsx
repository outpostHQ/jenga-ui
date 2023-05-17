import { ComponentMeta, Story } from '@storybook/react';
import { Gear } from '@jengaicons/react';

import { baseProps } from '../../../stories/lists/baseProps';

import { CopySnippet, JengaCopySnippetProps } from './CopySnippet';

export default {
  title: 'Content/CopySnippet',
  component: CopySnippet,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
} as ComponentMeta<typeof CopySnippet>;

const Template: Story<JengaCopySnippetProps> = (args) => (
  <CopySnippet {...args} />
);

export const OneLine = Template.bind({});
OneLine.args = {
  code: 'npm install -g jengajs-cli',
  prefix: '$ ',
};

export const WithCustomButton = Template.bind({});
WithCustomButton.args = {
  code: 'npm install -g jengajs-cli',
  prefix: '$ ',
  actions: <CopySnippet.Button icon={<Gear />} />,
};

export const Hidden = Template.bind({});
Hidden.args = {
  code: 'f8eh53jr8sdnzv%rsk',
  hideText: true,
};

export const PartiallyHidden = Template.bind({});
PartiallyHidden.args = {
  code: 'ssh -l admin -p f8eh53jr8sdnzv%rsk',
  hideText: 'f8eh53jr8sdnzv%rsk',
};

export const PartiallyHiddenMultipleParts = Template.bind({});
PartiallyHiddenMultipleParts.args = {
  code: 'ssh -l admin -p f8eh53jr8sdnzv%rsk && ssh -l admin -p fdse3kr*3%ftgs',
  hideText: ['f8eh53jr8sdnzv%rsk', 'fdse3kr*3%ftgs'],
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  code: 'npm install -g jengajs-cli\njengajs deploy',
  prefix: '$ ',
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  code: 'npm install -g jengajs-cli && jengajs deploy && npm install -g jengajs-cli && jengajs deploy && npm install -g jengajs-cli && jengajs deploy && npm install -g jengajs-cli && jengajs deploy',
  prefix: '$ ',
  styles: {
    width: 'max 300px',
  },
};

export const JavascriptSyntax = Template.bind({});
JavascriptSyntax.args = {
  language: 'javascript',
  code: `jenga('LineItems', {
  sql: \`SELECT * FROM public.line_items\`,


  joins: {
    Products: {
      sql: \`\${JENGA}.product_id = \${Products}.id\`,
      relationship: \`belongsTo\`
    },

    Orders: {
      sql: \`\${JENGA}.order_id = \${Orders}.id\`,
      relationship: \`belongsTo\`
    }
  },

  measures: {
    count: {
      type: \`count\`,
      drillMembers: [id, createdAt]
    },

    price: {
      sql: \`price\`,
      type: \`sum\`
    },

    quantity: {
      sql: \`quantity\`,
      type: \`sum\`
    }
  },

  dimensions: {
    id: {
      sql: \`id\`,
      type: \`number\`,
      primaryKey: true
    },

    createdAt: {
      sql: \`created_at\`,
      type: \`time\`
    }
  }
});`,
};
