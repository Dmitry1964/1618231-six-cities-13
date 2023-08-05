import { useState, useEffect } from 'react';
import NavigationItem from '../../components/ui/navigation-item/navigation-item';
import { AppRoute} from '../../components/const';
import Header from '../../components/header/header';
import { OfferType, Location, Nullable } from '../../types/offer-type';
import PlaceList from '../../components/place-list/place-list';
import { Cities } from '../../components/const';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { citySelection, loadOffers } from '../../store/actions';
import PlacesSorting from '../../components/places-sorting/places-sorting';

type PageMainProps = {
  offers: OfferType[];
}

const PageMain = ({ offers }: PageMainProps): JSX.Element => {
  const [activeCard, setActiveCard] = useState<Nullable<OfferType>>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers(offers));
  }, [offers, dispatch]);

  const currentCity = useAppSelector((state) => state.title);

  const handlerMenuItem = (title: string) => {
    dispatch(citySelection(title));
  };
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const centerLocation: Location = currentCityOffers[0].city.location;

  return (
    <div className="page page--gray page--main">
      <Header isAuthorization />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.keys(Cities).map((city) => (
                <NavigationItem handlerLinkItem={handlerMenuItem}
                  title={city}
                  key={city}
                  path={AppRoute.Main}
                  currentCity={currentCity}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOffers.length} places to stay in {currentCity}</b>
              <PlacesSorting />
              <div className="cities__places-list places__list tabs__content">
                <PlaceList offers={currentCityOffers} setActiveCard={setActiveCard} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map currentOffers={currentCityOffers} center={centerLocation} activeCardId={activeCard?.id} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default PageMain;
