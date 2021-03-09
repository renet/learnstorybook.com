import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

export default {
  component: Logo,
  title: 'Basics/Logo',
};

const BlueBackground = styled.div`
  padding: 20px;
  background-image: linear-gradient(14deg, #26c6db 0%, #2694db 100%);
`;

const Story = args => <Logo {...args} />;
export const Default = Story.bind({});

export const Inverted = Story.bind({});
Inverted.args = {
  isInverted: true,
};
Inverted.decorators = [story => <BlueBackground>{story()}</BlueBackground>];
