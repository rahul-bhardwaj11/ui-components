import React from 'react';

import { storiesOf } from '@storybook/react';
import PdfPlayer from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('PdfPlayer', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Default PdfViewer',
    withInfo('displaying PDF')(() => (
      <PdfPlayer
        uuid={
          '//mediaplayer.mindtickle.com/crocodoc/?data=Ym94OTU2NDI0MzI5MjU2MDAwNjU2IzE%3D&sig=dTEgJ1H8NxxtvVQzxMGyJsRqoVY%3D&time=1547732778'
        }
        src={
          'https://cf-ap1-mtdocs-box-processed.mindtickle.com/956424329256000656/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzk1NjQyNDMyOTI1NjAwMDY1Ni8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTQ3NzMyNzc4fSwiSXBBZGRyZXNzIjp7IkFXUzpTb3VyY2VJcCI6IjAuMC4wLjAvMCJ9LCJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTQ0NDk3NzExNn19fV19&Signature=fjPs~DEV6k4ptWtxBsQZA4ZVk8nOtVQJd8l3pz8OEa-AXUSimJXVrSnLMUyDXtOVdEvieDktUozyLChQP3kV2zsLop6lDLtX8GjMpMZJ2Y7HpvIG3-6zpIzmK5nW-h3N6dM4c0G6WBAHLs1wDk3rnto~6TEqxpsWFNVZz~zuhnA_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA'
        }
        title={'Sample PDF'}
      />
    ))
  )
  .add(
    'PdfViewer Edit Mode',
    withInfo('displaying PDF')(() => (
      <PdfPlayer
        uuid={
          '//mediaplayer.mindtickle.com/crocodoc/?data=Ym94OTU2NDI0MzI5MjU2MDAwNjU2IzE%3D&sig=dTEgJ1H8NxxtvVQzxMGyJsRqoVY%3D&time=1547732778'
        }
        src={
          'https://cf-ap1-mtdocs-box-processed.mindtickle.com/956424329256000656/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzk1NjQyNDMyOTI1NjAwMDY1Ni8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTQ3NzMyNzc4fSwiSXBBZGRyZXNzIjp7IkFXUzpTb3VyY2VJcCI6IjAuMC4wLjAvMCJ9LCJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTQ0NDk3NzExNn19fV19&Signature=fjPs~DEV6k4ptWtxBsQZA4ZVk8nOtVQJd8l3pz8OEa-AXUSimJXVrSnLMUyDXtOVdEvieDktUozyLChQP3kV2zsLop6lDLtX8GjMpMZJ2Y7HpvIG3-6zpIzmK5nW-h3N6dM4c0G6WBAHLs1wDk3rnto~6TEqxpsWFNVZz~zuhnA_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA'
        }
        //onPageChange={page => console.log(page)}
        isEditMode={true}
        title={'Sample PDF'}
        style={{ width: '100%', height: '400px' }}
      />
    ))
  );
