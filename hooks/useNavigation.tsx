import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type NavigationContext = 'header' | 'executive' | 'default';

export function useNavigation() {
    const router = useRouter();
    const [lastNavigation, setLastNavigation] = useState<{ path: string, context: NavigationContext } | null>(null);

    const navigate = useCallback((path: string, context: NavigationContext = 'default') => {
        console.log(`[useNavigation] Navigating to ${path} from ${context} context`);
        setLastNavigation({ path, context });
        router.push(path);
    }, [router]);

    const navigate2 = useCallback((path: string) => {
        console.log(`[useNavigation] Navigating to ${path} from ${context} context`);
        setLastNavigation({ path });
        router.push(path);
    }, [router]);

    return {
        navigate,
        lastNavigation,
    };
}