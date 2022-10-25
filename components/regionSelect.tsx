import { gensSelectedType } from "../logic/select-dex";

type Props = {
   setGensSelected: (state: gensSelectedType) => void;
   gensSelected: gensSelectedType;
};

export default function RegionSelect({ setGensSelected, gensSelected }: Props) {
   return (
      <div>
         <form>
            <label htmlFor="kanto">
               <input
                  type="checkbox"
                  name="kanto"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           kanto: !gensSelected.regions.kanto,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.kanto}
               />
               Kanto
            </label>
            <label htmlFor="johto">
               <input
                  type="checkbox"
                  name="johto"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           johto: !gensSelected.regions.johto,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.johto}
               />
               Johto
            </label>
            <label htmlFor="hoenn">
               <input
                  type="checkbox"
                  name="hoenn"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           hoenn: !gensSelected.regions.hoenn,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.hoenn}
               />
               Hoenn
            </label>
            <label htmlFor="sinnoh">
               <input
                  type="checkbox"
                  name="sinnoh"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           sinnoh: !gensSelected.regions.sinnoh,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.sinnoh}
               />
               Sinnoh
            </label>
            <label htmlFor="unova">
               <input
                  type="checkbox"
                  name="unova"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           unova: !gensSelected.regions.unova,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.unova}
               />
               Unova
            </label>
            <label htmlFor="kalos">
               <input
                  type="checkbox"
                  name="kalos"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           kalos: !gensSelected.regions.kalos,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.kalos}
               />
               Kalos
            </label>
            <label htmlFor="alola">
               <input
                  type="checkbox"
                  name="alola"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           alola: !gensSelected.regions.alola,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.alola}
               />
               Alola
            </label>
            <label htmlFor="galar">
               <input
                  type="checkbox"
                  name="galar"
                  onClick={() => {
                     setGensSelected({
                        ...gensSelected,
                        regions: {
                           ...gensSelected.regions,
                           galar: !gensSelected.regions.galar,
                        },
                     });
                  }}
                  defaultChecked={gensSelected.regions.galar}
               />
               Galar
            </label>
         </form>
      </div>
   );
}
