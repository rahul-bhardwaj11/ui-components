import AntSkeleton from 'antd/lib/skeleton';
import 'antd/lib/skeleton/style/index.css';
import styled from 'styled-components';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
};

const LOADER_COLOR = {
  [THEME.LIGHT]:
    'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
  [THEME.DARK]: 'linear-gradient(90deg, #29364a 25%, #353d50 37%, #29364a 63%)'
};

const StyledSkeletonLoader = styled(AntSkeleton)`
  && {
    &.ant-skeleton {
      &.ant-skeleton-with-avatar .ant-skeleton-content .ant-skeleton-title {
        margin: ${({ title: { margin } }) => margin || '0 auto 12px 0'};
      }

      .ant-skeleton-header {
        padding: 0 8px 0 0;

        .ant-skeleton-avatar.ant-skeleton-avatar-square,
        .ant-skeleton-avatar.ant-skeleton-avatar-circle {
          width: ${({ avatar: { width } }) => width || '16px'};
          height: ${({ avatar: { height } }) => height || '10px'};
          border-radius: ${({ avatar: { shape } }) => {
            switch (shape) {
              case 'circle':
                return '50%';
              case 'square':
                return '5px';
            }
          }};
          background: ${({ theme }) => LOADER_COLOR[theme]};
          animation: skeleton-loading 1.4s ease infinite;
          background-size: 400% 100%;
        }
      }

      .ant-skeleton-content {
        .ant-skeleton-title {
          margin: ${({ title: { margin } }) => margin || '0 auto 12px 0'};
          height: ${({ title: { height } }) => height || '10px'};
          border-radius: ${({ title: { height } }) => height || '5px'};
          background: ${({ theme }) => LOADER_COLOR[theme]};
          animation: skeleton-loading 1.4s ease infinite;
          background-size: 400% 100%;
        }
      }

      &.ant-skeleton-with-avatar {
        .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
          margin: ${({ paragraph: { margin } }) => margin || '12px 0 0 0'};
        }
      }

      .ant-skeleton-paragraph {
        margin: 0;

        li {
          border-radius: ${({ paragraph: { height } }) => height || '5px'};
          height: ${({ paragraph: { height } }) => height || '10px'};
        }

        li + li {
          margin: 12px 0 0 0;
        }
      }
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }
  }
`;

export default StyledSkeletonLoader;
