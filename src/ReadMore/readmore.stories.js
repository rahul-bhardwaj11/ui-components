import React from 'react';
import { storiesOf } from '@storybook/react';
import ReadMore from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('ReadMore', module);
stories.addDecorator(withKnobs);

stories.add(
  'ReadMore',
  withInfo('Basic usage of the ReadMore')(() => (
    <ReadMore
      html={`<ol><li><strong>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</strong></li><li><em>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. </em></li><li><em><u>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. </u></em></li><li><u>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. </u></li><li><strong><em><u>She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmar<span class="ql-cursor">&#65279;</span></u></em></strong></li><li><br></li></ol>`}
    />
  ))
);
stories.add(
  'ReadMore with html tags',
  withInfo('ReadMore with html tags')(() => (
    <ReadMore
      html={`<b>Hello</b> this form are mapped the sales stages, and the rep is
      specifically tested on the skill at each stage. Scale description; 0= No
      evidence of Skill [The rep is not able to demonstrate any of the required
      skills and behaviors expected to sell this product] ; 1= Basic level skill
      [The rep inconsistently demonstrates some but not many of the behaviors
      and skills required to sell this product]; 2= Beginner level skill [The
      rep inconsistently demonstrates many of the behavior and skills required
      to sell this In this form are mapped the sales stages, and the rep is
      specifically tested on the skill at each stage. Scale description; 0= No
      evidence of Skill [The rep is not able to demonstrate any of the required
      skills and behaviors expected to sell this product] ; 1= Basic level skill
      [The rep inconsistently demonstrates some but not many of the behaviors
      and skills required to sell this product]; 2= Beginner level skill [The
      rep inconsistently demonstrates many of the behavior and skills required
      to sell this In this form are mapped the sales stages, and the rep is
      specifically tested on the skill at each stage. Scale description; 0= No
      evidence of Skill [The rep is not able to demonstrate any of the required
      skills and behaviors expected to sell this product] ; 1= Basic level skill
      [The rep inconsistently demonstrates some but not many of the behaviors
      and skills required to sell this product]; 2= Beginner level skill [The
      rep inconsistently demonstrates many of the behavior and skills required
      to sell this In this form are mapped the sales stages, and the rep is
      specifically tested on the skill at each stage. Scale description; 0= No
      evidence of Skill [The rep is not able to demonstrate any of the required
      skills and behaviors expected to sell this product] ; 1= Basic level skill
      [The rep inconsistently demonstrates some but not many of the behaviors
      and skills required to sell this product]; 2= Beginner level skill [The
      rep inconsistently demonstrates many of the behavior and skills required
      to sell this`}
    />
  ))
);

stories.add(
  'ReadMore with multiple new lines',
  withInfo('ReadMore with text containing multiple new lines')(() => (
    <ReadMore
      html={` <p>aa</p><p>a</p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p>aa</p><p>a</p><p>a</p><p><br></p>
`}
    />
  ))
);
