import {FiPlus, FiMinus} from 'react-icons/fi'

const nonVeg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoklEQVR4nO2Xv0oDQRDGtzOXmRi1VLGyt5AZgwh5E/++g4jiIxmtRNTsFIKgopZG7Iy9CbFX5gx2wSS32b2Q/WDgiluY383OzHfGREVFReVSwvidpzATC2ACSyJAYEmswCRV4KIyPVfn0q4QnAlDQxi+utGwBKeyVtq52SjP5g7gtmISS3gkBO3/RyK0LOOhnjF5ALhcT+Yt4/2gc90yPl+tFpaCAggni0L4MexysoTN60qyEARAr4AQPmbdsJbxQaqm4B1ACI+dWQXCA68AOm36a9h+A1q9ptNIACzjnrvksVuF0rY3gN857xbAMtS8AViCN+cVYGj4BOg4rwBBZ6wBhKDtDUAYXkfQAy/eAFJj5r4HTrwBqKt0DVDn4qbfRcbQcnh9PmWlPOMNQKWW2B0A7g+bx9AAasBSI5b97t8FMXMqtcJqiTN8+Xf9n8iaR6aDmkD6FQdP/in4D83fu1VTUEvcT2Nrw+qdP182U67zyHxQLbG6St0Tuph0Y6ehzww1S8WtXtMmFwCjkESAwJJYgXGvgOQkzMQBREVFRRkf+gHhzjmciMgUEwAAAABJRU5ErkJggg=='
const veg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlUlEQVR4nO2XwUoDQQyG56be1KMVH8OJTWSvfQq1+g4iFfEoQpPaB7H2Naqox1a8qXdb6r2SrR6LdXd2Zkvnh8DC7sB8m0nmjzFRUVFRpRQITcoUZmkBTGBBBAgsiBlYpgwAw+ZeC4+BsWuZBiD4paHPlvHOMtXpijZKBwAMa7ZJ58A0+rsl4hCEGrrGlAGgel3dskz3/+3rlukZb3AnKMBuO9m2Qh+ZLyjGd2CoBAFIjw3jY+5blukhuUxWvQNYwQtXNsEKnnkF0G4zX8HOGzic1Z0KAsATd5unaRaa+0c+AbrOAYQ63gCs0KtzAKaBPwDGsXsAHC80ADCNvAGA4EsBNdD3BqDGrIAM3HoEoLp7ADzwe5FNXaWrAv5MWsm6N4Cf9w2HGTjNuo/MAGrA1IjlL17sBTFz6TcMldQSZwbAN50n8u4j/0Aj2Mvw55+CDzS/0iOglniewtaC1TNfa9dWXO8j90K1xOoq0wFeqK83dhr6LNQBwcNZ3aYUAEUIIkBgQczAomcAShJm6QCioqKijA99A3yCPIRsuFUZAAAAAElFTkSuQmCC'

const Card = ({item}) => (
  <div className="flex gap-2 justify-between p-2 border border-black rounded-md m-2">
    <div className="flex sm:flex-row flex-col sm:gap-4 align-top">
      <div>
        <img
          className="sm:min-w-[48px] max-w-6"
          src={item.dish_Type === 1 ? nonVeg : veg}
          alt="dish type"
        />
      </div>
      <div>
        <p className="text-lg font-bold">{item.dish_name}</p>
        <p className="mt-1 text-gray-700 font-bold">
          {item.dish_currency} {item.dish_price}
        </p>
        <p className="text-sm text-gray-500 mt-1">{item.dish_description}</p>
        {item.dish_Availability ? (
          <div className="flex gap-6 items-center justify-center max-w-fit px-6 py-2 rounded-full mt-4 text-white text-lg bg-green-600">
            <button aria-labelledby="text" type="button">
              <FiMinus />
            </button>
            <p>0</p>
            <button aria-labelledby="text" type="button">
              <FiPlus />
            </button>
          </div>
        ) : (
          <p className="text-red-500">Not available</p>
        )}
        {item.addonCat.length > 0 && (
          <p className="text-blue-500 mt-1">Customize available</p>
        )}
      </div>
    </div>
    <div className="flex sm:flex-row flex-col-reverse gap-4 sm:gap-10 items-center justify-end sm:min-w-72">
      <p className="text-yellow-600 font-bold text-lg">
        {item.dish_calories} Calories
      </p>
      <div>
        <img
          className="rounded-xl min-w-32 w-32 h-32 aspect-square"
          src={item.dish_image}
          alt="dish"
        />
      </div>
    </div>
  </div>
)

export default Card
