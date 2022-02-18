import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  loading: boolean;
  size?: number;
}

export function ClipLoaderSpinner({ loading = false, size = 80 }: Props) {
  return (
    <ClipLoader
      color="#c86420"
      loading={loading}
      size={size}
      speedMultiplier={0.3}
    />
  );
}
