import { useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

type Action<TData> =
  | { type: "DELETE" }
  | { type: "DELETE_SUCCESS"; payload: TData }
  | { type: "DELETE_ERROR" };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>) => {
  switch (action.type) {
    case "DELETE": {
      return { ...state, loading: true };
    }
    case "DELETE_SUCCESS": {
      return { ...state, loading: false };
    }
    case "DELETE_ERROR": {
      return { ...state, loading: false, error: true };
    }
    default:
      throw new Error("Error in reducer");
  }
};

export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });
  /* const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  }); */

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "DELETE" });
      /* setState({ data: null, loading: true, error: false }); */

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({ type: "DELETE_SUCCESS", payload: data });
      /* setState({ data, loading: false, error: false }); */
    } catch (error) {
      dispatch({ type: "DELETE_ERROR" });
      /* setState({ data: null, loading: false, error: true }); */
      throw console.error(error);
    }
  };

  return [fetch, state];
};
