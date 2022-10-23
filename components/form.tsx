type Props = {
   handleSubmit: (event: any) => void;
};

export default function Form({ handleSubmit }: Props) {
   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            id="password"
            name="password"
            placeholder="input password"
            required
         />
         <input type="submit" />
      </form>
   );
}
