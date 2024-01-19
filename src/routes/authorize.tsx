import { useLocation, useNavigate } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { useAuth0 } from '~/components';

const Authorize = () => {
  const navigate = useNavigate();
  const [_, authAct] = useAuth0();
  const loc = useLocation();
  const [code, setCode] = createSignal<string | undefined>(loc.query.code);
  const [state, setState] = createSignal<string | undefined>(loc.query.state);
  onMount(async () => {
    if (code() === undefined || state() === undefined) return navigate('/');
    return await authAct.completeAuthorization(code()!, state()!);
  });
  return <></>;
};

export default Authorize;
