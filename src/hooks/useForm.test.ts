import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './useForm';

describe('useForm', () => {
  it('initializes with the provided values', () => {
    const initialValues = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialValues));
    expect(result.current.values).toEqual(initialValues);
  });

  it('updates values when handleChange is called', () => {
    const { result } = renderHook(() => useForm({ name: '' }));
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.name).toBe('John Doe');
  });

  it('calls onSubmit with current values when form is submitted', () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => useForm({ name: 'John Doe' }));
    act(() => {
      result.current.handleSubmit(onSubmit)({ preventDefault: jest.fn() } as any);
    });
    expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
  });

  it('sets field error correctly', () => {
    const { result } = renderHook(() => useForm({ name: '' }));
    act(() => {
      result.current.setFieldError('name', 'Name is required');
    });
    expect(result.current.errors.name).toBe('Name is required');
  });

  it('resets form to initial values', () => {
    const initialValues = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialValues));
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.resetForm();
    });
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });
});