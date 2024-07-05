import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModeContext } from "../../../providers/mode";
import { db } from "../../../api/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from "firebase/firestore";
import { PageHeader } from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Recipe } from "../../../commons/types/Recipe";
import { User } from "firebase/auth";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { IconButton } from "@radix-ui/themes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "../../atomic/Toast/Toast";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ButtonSolid } from "../../atomic/Buttons/ButtonSolid";
import { ButtonOutline } from "../../atomic/Buttons/ButtonOutline";

interface RecipeDetailsProps {
  user: User | null;
}

export const RecipeDetails = ({ user }: RecipeDetailsProps) => {
  const { mode } = useModeContext();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState<boolean>(false);
  const { recipeId, option } = useParams<{ recipeId: string; option: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!recipeId || !option) return;

      const docRef = doc(db, `recipes`, option);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data[recipeId]) {
            setRecipe(data[recipeId] as Recipe);
          } else {
            console.log("No such recipe!");
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchData();
  }, [recipeId, option]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !recipeId || !recipe) return;

      const userId = user.uid;
      const cuisine = recipe.cuisine;

      try {
        const docRef = doc(db, `userFavorites/${userId}/cuisines/${cuisine}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.recipes && data.recipes.includes(recipeId)) {
            setIsAddedToFavorite(true);
          } else {
            setIsAddedToFavorite(false);
          }
        } else {
          setIsAddedToFavorite(false);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user, recipeId, recipe]);

  const toggleFavorite = async () => {
    if (user && recipeId && recipe) {
      const userId = user.uid;
      const cuisine = recipe.cuisine;

      try {
        const docRef = doc(db, `userFavorites/${userId}/cuisines/${cuisine}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.recipes && data.recipes.includes(recipeId)) {
            await updateDoc(docRef, {
              recipes: arrayRemove(recipeId)
            });
            setIsAddedToFavorite(false);
          } else {
            await updateDoc(docRef, {
              recipes: arrayUnion(recipeId)
            });
            setIsAddedToFavorite(true);
          }
        } else {
          await setDoc(docRef, {
            recipes: [recipeId]
          });
          setIsAddedToFavorite(true);
        }
      } catch (error) {
        console.error("Error changing favorites status:", error);
        toast.error("Error changing favorites status");
      }
    } else if (user) {
      console.error("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Page>
      <PageHeader>
        {recipe.name}
      </PageHeader>
      <div className="text-lg mx-14 my-2.5 text-justify">
        {recipe.description}
      </div>
      <div className={
        `relative 
        grid grid-cols-1 md:grid-cols-2 items-center list-none border rounded-lg m-10 md:m-5 relative 
        ${mode === "dark" ? "bg-midnightMoss border-midnightMoss" : "bg-fairGreen border-lightGreen"}`
      }>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <IconButton
                    onClick={toggleFavorite}
                    className={`absolute top-4 right-4 p-2 bg-transparent rounded-md 
                      ${mode === "dark" ?
                        "hover:bg-optionHoverDark" :
                        "hover:bg-optionHover"
                      }`
                    }
                  >
                    {isAddedToFavorite ?
                      <HeartFilledIcon width="18" height="18" />
                      :
                      <HeartIcon width="18" height="18" />
                    }
                  </IconButton>
                </AlertDialog.Trigger>
                {!user && <AlertDialog.Portal>
                  <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                      This function available only for logged users
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                      You have to login to your account
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                      <AlertDialog.Cancel asChild>
                        <ButtonOutline>
                          Cancel
                        </ButtonOutline>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <ButtonSolid onClick={() => { navigate("/login") }}>
                          Go to login page
                        </ButtonSolid>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>}
              </AlertDialog.Root>

            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 text-white rounded-md p-2">
              {isAddedToFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="m-7 grid-col-1 grid-row-1 text-center flex items-start justify-center">
          <div className="w-[70%] overflow-hidden rounded-md">
            <AspectRatio.Root ratio={5 / 4}>
              <img
                className="h-full w-full object-cover"
                src={recipe.src}
                alt={recipe.name}
              />
            </AspectRatio.Root>
          </div>
        </div>
        <div className="m-7 md:grid-col-2 md:grid-row-1">
          <h3 className="capitalize font-semibold underline">
            Ingredients:
          </h3>
          <ul className="list-none">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={Math.floor(Math.random() * Date.now())}
                className="my-2.5"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="m-7 md:mx-14 md:my-2.5 md:col-span-full md:row-start-2">
          <h3 className="capitalize font-semibold underline">
            Instructions:
          </h3>
          <ol className="list-decimal">
            {recipe.instructions.map((instruction) => (
              <li
                key={Math.floor(Math.random() * Date.now())}
                className="my-2.5 mx-4"
              >
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Toast />
    </Page>
  );
};
