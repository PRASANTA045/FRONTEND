import { Card, CardContent } from "@/components/ui/card";

import { Mail, Phone, MapPin } from "lucide-react";

const centres = [
  {
    name: "BALC Sunkadakatte",
    address: "BALC, #10/15, 1st Floor, G.T.Complex, Sunkadakatte, Magadi Main Road, Bengaluru - 560091",
    phone: "+91 98860 50481",
    email: "balc.sunkadakatte@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.851!2d77.5432!3d13.0186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1c0d3c4f3e4b%3A0x1a2b3c4d5e6f!2sSunkadakatte%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600000000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Tollgate",
    address: "#156, 2nd Floor, Opp. Prasanna theatre, Tollgate Magadi Road, Bengaluru -560023",
    phone: "+91 96060 72647",
    email: "balctollgate@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.940!2d77.5556!3d13.0123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1701a2b3c4d5%3A0x6f7e8d9c0b1a!2sTollgate%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600100000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Rajajinagar",
    address: "BALC CADD, No.1762/2, Opp. Navarang Theatre, Dr.Rajkumar Road, Rajajinagara Bengaluru -560010",
    phone: "+91 88848 68882",
    email: "balc.rajajinagara@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.159!2d77.6994!3d12.9623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13f09a2a3d3f%3A0x3d9f8b4e84ad2390!2sRajajinagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600200000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Uttarahalli",
    address: "#629/443/ZA 1st Floor Above Corporation Bank, Uttarahalli Main Road. Bengaluru-61",
    phone: "+91 96069 98866",
    email: "balcuttarahalli06@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.092!2d76.6294!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf700bf75cbbd3%3A0x43e8b2a3e5a86a5e!2sUttarahalli%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600300000!5m2!1sen!2sin",
  },
  {
    name: "BALC Viajyanagar",
    address: "Near BMTC Pass Counter, Service Road, 8th Main opp Indraprastha hotel, Vijayanagar, Bengaluru -40",
    phone: "+91 90087 60400",
    email: "balcvijayanagar@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.869!2d75.1234!3d15.3643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf0c1234567abcd%3A0xabcdef1234567890!2sVijayanagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600400000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD RR Nagar",
    address: "BALC, #479, 2nd Floor, Near BEML Complex, Opp. Food World, Model Road R R Nagar, Bengaluru – 560098",
    phone: "+91 81232 44775",
    email: "balcrrnagar@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.123!2d74.7912!3d12.9143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba1234567abcdef%3A0xabcdef1234567890!2sRR%20Nagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600500000!5m2!1sen!2sin",
  },
  {
    name: "BALC T-Dasarahalli",
    address: "#275,3rd Main, Bhuvaneshwarinagar, T .DASARAHALLI,opp to Bangalore Patidhar Samaj, Bangalore-560057.",
    phone: "+91 74061 66787",
    email: "balctdasarahalli@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.123!2d74.8456!3d15.8490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac1234567abcdef%3A0xabcdef1234567890!2sT-Dasarahalli%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600600000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Jayanagar",
    address: "BALC, #651, 2nd Floor, Opp Cool Joint, 11th Main Rd, 4th Block, Bengaluru, Karnataka 560011",
    phone: "+91 88844 83483",
    email: "balc.jayanagar@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123!2d75.9201!3d14.4667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba456123456abcdef%3A0xabcdef1234567890!2sJayanagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600700000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Basavanagudi",
    address: "BALC, #7/1 Mount joy road, Bull Temple Rd, Hanumanthnagar, Basavanagudi, Bengaluru-19",
    phone: "+91 88844 82482",
    email: "basavanagudibalc@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.123!2d77.1001!3d13.3394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba678123456abcdef%3A0xabcdef1234567890!2sBasavanagudi%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600800000!5m2!1sen!2sin",
  },
  {
    name: "BALC CADD Training Centre Malleshwaram",
    address: "no.64,1st Floor, 18th Cross, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560055",
    phone: "+91 88844 98883",
    email: "balcmalleshwaram1@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.123!2d80.2701!3d13.0821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526123456abcdef%3A0xabcdef1234567890!2sMalleshwaram%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699600900000!5m2!1sen!2sin",
  },
  {
    name: "BALC Digital Marketing Training Centre Basavanagudi",
    address: "67, 1st Floor, Kabirmutt Road, above Dosa Camp, Sunkenahalli, Hanumanthnagar, basavanagudi",
    phone: "+91 88845 34534",
    email: "balc.bsg2024@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123!2d78.4861!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb123456abcdef%3A0xabcdef1234567890!2sBasavanagudi%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699601000000!5m2!1sen!2sin",
  },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* --- All Centres Section Only --- */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Centres</h2>
        <p className="text-gray-600 mb-10">
          Find the nearest BALC branch and connect with our team for assistance or training enquiries.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {centres.map((centre, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">{centre.name}</h3>

                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <p className="text-gray-700">{centre.address}</p>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700">{centre.phone}</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700">{centre.email}</p>
                </div>

                <iframe
                  src={centre.map}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-sm"
                ></iframe>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;