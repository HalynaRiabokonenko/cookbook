import React from "react";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

export const About = () => {
    return (
        <div className=" lg:space-y-0 lg:px-10 lg:py-10 lg:my-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 px-8 lg:mx-10">
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={5 / 3}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/about/food-2.avif"
                            alt="food and spices"
                        />
                    </AspectRatio.Root>
                </div>
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Welcome to Proven Recipes
                    </h2>
                    <p className="text-justify text-lg">
                        Welcome to Proven Recipes, your gateway to a world of culinary delights! We're passionate about sharing the rich and diverse flavors of cuisines from around the globe. Whether you're craving the spicy warmth of Indian curry, the comforting aroma of Italian pasta, or the zesty freshness of Mexican salsa, you'll find an array of tantalizing recipes to explore right here.
                    </p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Our Mission
                    </h2>
                    <p className="text-justify text-lg">
                        Our mission is simple yet profound: to bring the authentic tastes of different cultures directly to your kitchen. Each recipe we feature has been carefully selected and tested to ensure it captures the essence of its cultural origin. From street food favorites to gourmet classics, we're dedicated to making international cuisine accessible to everyone, one recipe at a time.
                    </p>
                </div>
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={1 / 1}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/pages/world-food.png"
                            alt="globe with pins"
                        />
                    </AspectRatio.Root>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={1 / 1}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/pages/food.png"
                            alt="man hands preparing food"
                        />
                    </AspectRatio.Root>
                </div>
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Founded with Passion
                    </h2>
                    <p className="text-justify text-lg">
                        Proven Recipes is more than just a collection of recipes; it's a labor of love crafted by enthusiasts deeply rooted in the culinary traditions of diverse countries. Our journey began with a shared appreciation for the time-honored techniques and flavors passed down through generations. With each recipe, we aim to pay homage to these traditions while also celebrating the innovation and creativity that make global cuisine endlessly fascinating.
                    </p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Commitment to Authenticity
                    </h2>
                    <p className="text-justify text-lg">
                        What sets us apart is our unwavering commitment to authenticity. Every recipe undergoes meticulous research and testing to ensure it stays true to its cultural heritage. From sourcing the right ingredients to perfecting cooking methods, we leave no stone unturned in our quest to deliver an authentic culinary experience that honors the flavors and traditions of each region.
                    </p>
                </div>
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={5 / 3}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/about/spices.avif"
                            alt="spices"
                        />
                    </AspectRatio.Root>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={5 / 3}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/about/cooking.avif"
                            alt="men are cooking together"
                        />
                    </AspectRatio.Root>
                </div>
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Building a Community
                    </h2>
                    <p className="text-justify text-lg">
                        At Proven Recipes, we believe that food has the power to connect people across borders and cultures. That's why we're dedicated to fostering a vibrant community where food lovers and culinary enthusiasts can come together to share their passion, exchange ideas, and inspire each other's culinary adventures. Whether you're a seasoned chef or a curious beginner, you'll find a warm welcome here.
                    </p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Embark on a Culinary Journey
                    </h2>
                    <p className="text-justify text-lg">
                        Embark on a culinary journey like no other with Proven Recipes as your guide. Whether you're looking to expand your culinary repertoire or simply seeking inspiration for your next meal, we're here to help you explore the delicious world of international cuisine. So roll up your sleeves, sharpen your knives, and get ready to discover a world of flavors right in your own kitchen.
                    </p>
                </div>
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={1 / 1}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/pages/travel.png"
                            alt="suitcase with clothes"
                        />
                    </AspectRatio.Root>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 my-10 px-8 lg:mx-10">
                <div className="overflow-hidden rounded-md w-full lg:w-1/2 mt-2.5 mb-2.5">
                    <AspectRatio.Root ratio={5 / 3}>
                        <img
                            className="h-full w-full object-cover"
                            src="/images/about/enjoy-2.avif"
                            alt="family eats food"
                        />
                    </AspectRatio.Root>
                </div>
                <div className="w-full lg:w-1/2 mt-5 mb-5">
                    <h2 className="uppercase text-center my-5 text-xl font-semibold">
                        Explore and Enjoy
                    </h2>
                    <p className="text-justify text-lg">
                        Thank you for being a part of our community. We invite you to dive into our extensive collection of recipes, roll up your sleeves, and embark on your own culinary adventure. Whether you're cooking for yourself, your family, or your friends, we hope our recipes bring joy and satisfaction to your table. So go ahead, explore, experiment, and above all, enjoy the delicious journey that awaits you!
                    </p>
                </div>
            </div>
        </div>
    );
}