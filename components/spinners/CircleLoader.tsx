import CircleLoader from 'react-spinners/CircleLoader';

interface Props {
  loading: boolean;
  size?: number;
}

export function CircleLoaderSpinner({ loading = false, size = 80 }: Props) {
  return (
    <CircleLoader
      color="#c86420"
      loading={loading}
      size={size}
      // speedMultiplier={0.5}
    />
  );
}
