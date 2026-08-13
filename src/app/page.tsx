import { ScrollController } from '@/components/experience/ScrollController';
import { SceneManager } from '@/components/experience/SceneManager';

export default function Home() {
  return (
    <ScrollController>
      <SceneManager />
    </ScrollController>
  );
}
