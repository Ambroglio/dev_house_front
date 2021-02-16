import { compose } from "redux";
import { liftState, loop, Cmd } from "redux-loop";
import S from "sanctuary";
import $ from "sanctuary-def";

import { SAVE } from "./action";
export const initialState = { value: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORAGE/SAVE":
      const actualValue = S.fromMaybe(0)(S.get(S.is($.Number))("value")(state));
      localStorage.setItem("counter", actualValue);
      return state;
    case "COUNTER/INCREMENT":
      const incValue = S.fromMaybe(0)(
        S.gets(S.is($.Number))(["payload", "amount"])(action)
      );
      const more = S.maybe(0)(S.add(incValue))(
        S.get(S.is($.Number))("value")(state)
      );
      return loop({ ...state, value: more }, Cmd.action(SAVE));
    case "COUNTER/DECREMENT":
      const decvalue = S.fromMaybe(0)(
        S.gets(S.is($.Number))(["payload", "amount"])(action)
      );
      const oneLess = S.maybe(0)(S.add(-decvalue))(
        S.get(S.is($.Number))("value")(state)
      );
      return loop({ ...state, value: oneLess }, Cmd.action(SAVE));
    default:
      return state;
  }
};

export default compose(liftState, reducer);
