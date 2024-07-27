import { AppLayout } from './components/ui/app-layout';
import { ClusterProvider } from './components/cluster/cluster-data-access';
import { SolanaProvider } from './components/solana/solana-provider';

export default function RootLayout({children,}: {children: React.ReactNode; }) {
  return (
        <ClusterProvider>
          <SolanaProvider>
            <AppLayout>{children}</AppLayout>
          </SolanaProvider>
        </ClusterProvider>
  );
}
