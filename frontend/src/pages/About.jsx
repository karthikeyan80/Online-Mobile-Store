import assets from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 my-14 border-t ">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-[450px] " src={assets.about_img} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Online Mobile Store, your trusted destination for the latest smartphones and accessories. We are passionate about connecting people with technology that enhances their lives. Our curated selection features top brands, competitive prices, and a seamless shopping experience designed to meet the needs of every customer. Whether you are a tech enthusiast or simply looking for a reliable device, we are here to help you make the right choice.
          </p>
          <b className="text-black text-xl font-bold">Our Mission</b>
          <p>
            Our mission is to empower individuals by providing access to innovative mobile technology and exceptional service. We strive to bridge the gap between people and the digital world by offering high-quality products, expert advice, and ongoing support. Through integrity, transparency, and a customer-first approach, we aim to build lasting relationships and contribute to a more connected community.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance :</b>
          <p>
            We are meticulous about the quality of our products and services.
            Every item undergoes strict quality checks to ensure it meets our
            high standards before reaching our customers. Our commitment to
            excellence guarantees that you receive only the best products,
            backed by reliable support and continuous improvement.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience</b>
          <p>
            Shopping with us is easy and hassle-free. Our user-friendly platform
            allows you to browse, compare, and purchase products from anywhere
            at any time. We offer multiple secure payment options and fast
            delivery, ensuring a smooth and convenient experience from start to
            finish.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated customer support team is always ready to assist you
            with any questions or concerns. We prioritize your satisfaction by
            providing prompt responses, helpful guidance, and personalized
            solutions. From pre-purchase inquiries to after-sales support, we
            strive to make your shopping experience smooth, enjoyable, and
            worry-free.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
