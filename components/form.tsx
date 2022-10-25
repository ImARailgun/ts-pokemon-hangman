import { saveType } from "../logic/save";

type Props = {
   setPassword: (str: string) => void;
   save: saveType;
   password: string;
};

export default function Form({ setPassword, save, password }: Props) {
   const handleSubmit = (event: any) => {
      event.preventDefault();

      const input = event.target.password.value;
      if (input !== "" && input !== save.password) {
         setPassword(input);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            id="password"
            name="password"
            placeholder="input password"
            defaultValue={password}
            required
         />
         <input type="submit" />
      </form>
   );
}
