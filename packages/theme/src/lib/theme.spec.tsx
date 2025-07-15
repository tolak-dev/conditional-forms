import { render } from '@testing-library/react';

import ConditionalFormReactTheme from './theme';

describe('ConditionalFormReactTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConditionalFormReactTheme />);
    expect(baseElement).toBeTruthy();
  });
});
