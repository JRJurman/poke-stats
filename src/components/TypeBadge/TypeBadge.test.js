import TypeBadge from './TypeBadge';

describe('TypeBadge', () => {
  it('should match snapshot with type', () => {
    const wrapper = TypeBadge({ type: 'FIRE' });
    expect(wrapper.outerHTML).toMatchSnapshot();
  });

  it('should match snapshot with type in shorthand', () => {
    const wrapper = TypeBadge({ type: 'FIRE', short: true });
    expect(wrapper.outerHTML).toMatchSnapshot();
  });

  it('should match snapshot with type and effectiveness', () => {
    const wrapper = TypeBadge({ type: 'FIRE', effectiveness: 2 });
    expect(wrapper.outerHTML).toMatchSnapshot();
  });

  it('should match snapshot with type and effectiveness in vertical', () => {
    const wrapper = TypeBadge({ type: 'FIRE', effectiveness: 2, vertical: true });
    expect(wrapper.outerHTML).toMatchSnapshot();
  });
});
