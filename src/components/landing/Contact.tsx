import { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { TAB_CONFIG, FORM_ENDPOINTS } from '../../data/landingData';

interface ContactProps {
  formType: string;
  setFormType: (type: string) => void;
}

export const Contact = ({ formType, setFormType }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '', surname: '', contact: '', province: 'Gauteng', grade: 'Grade 12', school: '', message: '', consent: false, website: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const makeRef = () => {
    const t = { learner:'L', parent:'P', mentor:'M', partner:'C', branch:'B' }[formType as keyof typeof TAB_CONFIG] || 'X';
    const d = new Date();
    const p = (n: number) => String(n).padStart(2,'0');
    const stamp = `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
    const suffix = Math.floor(100 + Math.random() * 900);
    return `JP-${t}-${stamp}-${suffix}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // Honeypot

    let valid = true;
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) { newErrors.name = true; valid = false; }
    if (!formData.surname.trim()) { newErrors.surname = true; valid = false; }
    if (!formData.contact.trim()) { newErrors.contact = true; valid = false; }
    if (!formData.message.trim()) { newErrors.message = true; valid = false; }
    
    if (!formData.consent) {
      valid = false;
      alert('Please tick the consent box so we may process your enquiry (required under POPIA).');
    }
    setErrors(newErrors);

    if (!valid) return;

    const ref = makeRef();
    setRefNumber(ref);
    
    const endpointConfig = FORM_ENDPOINTS[formType] || { url: '' };
    if (endpointConfig.url) {
      setSuccessMsg('Please save this provisional reference number. We aim to acknowledge your enquiry within one working day and respond within three working days. If you do not hear from us, contact us and quote this reference.');
    } else {
      setSuccessMsg(`Your submission has not been saved automatically yet. Please send your name and this provisional reference to info@jernuambopathways.org or WhatsApp 081 845 8474 to complete it.`);
    }
    
    setSuccess(true);
    setFormData({
      name: '', surname: '', contact: '', province: 'Gauteng', grade: 'Grade 12', school: '', message: '', consent: false, website: ''
    });
  };

  return (
    <>
      <section id="contact" className="bg-[#F5F0E8] py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <Reveal className="max-w-[640px] mb-10">
            <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Contact &amp; Applications</span>
            <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Let's Take the<br /><span className="text-[#1E6B3C]">Next Step.</span></h2>
            <p className="text-[#5C6672]">Choose the form that fits you. Every submission receives a provisional reference number. We aim to acknowledge enquiries within one working day and respond within three working days.</p>
          </Reveal>

          <div className="flex gap-2 flex-wrap mb-6">
            {Object.keys(TAB_CONFIG).map(type => (
              <button
                key={type}
                onClick={() => { setFormType(type); setSuccess(false); }}
                className={`border rounded-full px-5 py-2.5 uppercase tracking-wider text-xs font-semibold font-['Oswald',sans-serif] transition-colors ${formType === type ? 'bg-[#1E6B3C] border-[#1E6B3C] text-white' : 'bg-white border-[#CFC5AF] text-[#1A3A5C] hover:border-[#C9A84C]'}`}
              >
                {TAB_CONFIG[type as keyof typeof TAB_CONFIG].label}
              </button>
            ))}
          </div>

          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="bg-white border border-[#E3DCCE] rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="f-name" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">First name <span className="text-[#C4651A]">*</span></label>
                  <input type="text" id="f-name" name="name" value={formData.name} onChange={handleChange} required autoComplete="given-name" className={`w-full p-3 border rounded-lg ${errors.name ? 'border-[#C4651A]' : 'border-[#CFC5AF]'} focus:outline-none focus:border-[#C9A84C]`} />
                  {errors.name && <span className="text-[#A63B10] text-xs mt-1 font-semibold block">Please enter your first name.</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="f-surname" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">Surname <span className="text-[#C4651A]">*</span></label>
                  <input type="text" id="f-surname" name="surname" value={formData.surname} onChange={handleChange} required autoComplete="family-name" className={`w-full p-3 border rounded-lg ${errors.surname ? 'border-[#C4651A]' : 'border-[#CFC5AF]'} focus:outline-none focus:border-[#C9A84C]`} />
                  {errors.surname && <span className="text-[#A63B10] text-xs mt-1 font-semibold block">Please enter your surname.</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="f-contact" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">Phone or email <span className="text-[#C4651A]">*</span></label>
                  <input type="text" id="f-contact" name="contact" value={formData.contact} onChange={handleChange} required autoComplete="tel" className={`w-full p-3 border rounded-lg ${errors.contact ? 'border-[#C4651A]' : 'border-[#CFC5AF]'} focus:outline-none focus:border-[#C9A84C]`} />
                  {errors.contact && <span className="text-[#A63B10] text-xs mt-1 font-semibold block">Please enter a phone number or email so we can reach you.</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="f-province" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">Province</label>
                  <select id="f-province" name="province" value={formData.province} onChange={handleChange} className="w-full p-3 border border-[#CFC5AF] rounded-lg focus:outline-none focus:border-[#C9A84C] bg-white">
                    <option>Gauteng</option><option>Eastern Cape</option><option>Free State</option>
                    <option>KwaZulu-Natal</option><option>Limpopo</option><option>Mpumalanga</option>
                    <option>North West</option><option>Northern Cape</option><option>Western Cape</option>
                  </select>
                </div>
              </div>
              {TAB_CONFIG[formType as keyof typeof TAB_CONFIG]?.learnerFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="f-grade" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">Current grade / status</label>
                    <select id="f-grade" name="grade" value={formData.grade} onChange={handleChange} className="w-full p-3 border border-[#CFC5AF] rounded-lg focus:outline-none focus:border-[#C9A84C] bg-white">
                      <option>Grade 12</option><option>Grade 11</option><option>Grade 10</option>
                      <option>Gap year / matriculated</option><option>Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="f-school" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">School (optional)</label>
                    <input type="text" id="f-school" name="school" value={formData.school} onChange={handleChange} className="w-full p-3 border border-[#CFC5AF] rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="f-message" className="block font-semibold text-sm mb-1.5 text-[#1A3A5C]">{TAB_CONFIG[formType as keyof typeof TAB_CONFIG]?.msg} <span className="text-[#C4651A]">*</span></label>
                <textarea id="f-message" name="message" rows={4} value={formData.message} onChange={handleChange} required className={`w-full p-3 border rounded-lg ${errors.message ? 'border-[#C4651A]' : 'border-[#CFC5AF]'} focus:outline-none focus:border-[#C9A84C]`} />
                {errors.message && <span className="text-[#A63B10] text-xs mt-1 font-semibold block">Please tell us briefly how we can help.</span>}
              </div>
              <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="f-website">Leave this field empty</label>
                <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>
              <div className="flex gap-3 items-start bg-[#F5F0E8] border border-[#E3DCCE] rounded-lg p-4 my-4">
                <input type="checkbox" id="f-consent" name="consent" checked={formData.consent} onChange={handleChange} required className="w-5 h-5 mt-0.5 accent-[#1E6B3C] flex-none" />
                <label htmlFor="f-consent" className="text-sm text-[#2D2D2D]"><strong>Consent (POPIA):</strong> I agree that Jernuambo Pathways NPC may store and use the details above to respond to my enquiry and provide the support I have requested. I understand my information will not be shared for marketing, and I may ask for it to be corrected or deleted at any time. If I am under 18, I confirm my parent or guardian is aware of this enquiry, and I understand that separate, verifiable parent or guardian consent will be required before any mentorship matching or document processing takes place.</label>
              </div>
              <p className="bg-[#FBEEDF] border border-[#EED9BD] border-l-4 border-l-[#C4651A] rounded-lg p-4 text-sm text-[#6B4212] mb-5"><strong>Do not attach or send documents.</strong> First contact needs only your name, surname and contact details. We will request documents securely only when required.</p>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#1E6B3C] text-white uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
                Submit <span>→</span>
              </button>
              
              {success && (
                <div className="bg-[#E7F0EA] border border-[#C4DCCB] border-l-4 border-l-[#1E6B3C] rounded-xl p-6 mt-5">
                  <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1E6B3C] text-base mb-2">Your submission has been sent</h3>
                  <p>Your provisional reference number is:</p>
                  <p className="font-['Oswald',sans-serif] text-2xl font-bold text-[#1A3A5C] tracking-widest my-2">{refNumber}</p>
                  <p className="text-sm">{successMsg}</p>
                </div>
              )}
              <p className="text-xs text-[#5C6672] mt-4">Jernuambo Pathways NPC (Reg. 2026/283524/08) is the responsible party for this information under POPIA. Information Officer: The Director, info@jernuambopathways.org. See the Privacy Notice below.</p>
            </form>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border border-[#E3DCCE] rounded-xl p-5">
              <strong className="text-[#1A3A5C]">Phone / WhatsApp</strong><br />
              <a href="tel:+27818458474" className="text-[#1E6B3C] font-bold no-underline">081 845 8474</a>
            </div>
            <div className="bg-white border border-[#E3DCCE] rounded-xl p-5">
              <strong className="text-[#1A3A5C]">Email</strong><br />
              <a href="mailto:info@jernuambopathways.org" className="text-[#1E6B3C] font-bold no-underline">info@jernuambopathways.org</a>
            </div>
            <div className="bg-white border border-[#E3DCCE] rounded-xl p-5">
              <strong className="text-[#1A3A5C]">Registered Office</strong><br />
              <span className="text-[#5C6672]">Wattville, Benoni, Gauteng<br /><em className="text-xs">Visits by appointment only.</em></span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="privacy" className="py-20">
        <div className="max-w-[840px] mx-auto px-6">
          <Reveal className="mb-10">
            <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Privacy Notice</span>
            <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">How We Protect<br /><span className="text-[#1E6B3C]">Your Information.</span></h2>
            <p className="text-[#5C6672]">This notice explains how Jernuambo Pathways NPC handles personal information under the Protection of Personal Information Act, 2013 (POPIA).</p>
          </Reveal>
          <Reveal>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">Who we are</h3>
            <p className="text-sm text-[#5C6672]">Jernuambo Pathways NPC (Reg. 2026/283524/08), with its registered office in Wattville, Benoni, Gauteng (full registered address on official company records), is the responsible party. Our Information Officer is the Director, reachable at info@jernuambopathways.org.</p>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">What we collect and why</h3>
            <ul className="list-disc pl-5 my-2 text-sm text-[#5C6672]">
              <li><strong>Enquiry details</strong> (name, surname, contact details, province, grade): to respond to you and provide the support you request.</li>
              <li><strong>Mentor and volunteer details</strong>: to screen, onboard and assign mentors responsibly.</li>
              <li><strong>Newsletter email addresses</strong>: to send opportunities, resources and news, with your consent.</li>
            </ul>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">What we do not do</h3>
            <ul className="list-disc pl-5 my-2 text-sm text-[#5C6672]">
              <li>We do not sell or share personal information for marketing.</li>
              <li>We do not accept identity documents, academic records or financial documents by email or WhatsApp.</li>
              <li>We do not collect more information than we need for the purpose you contacted us for.</li>
            </ul>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">Children's information</h3>
            <p className="text-sm text-[#5C6672]">Where a learner is under 18, we require parent or guardian awareness at first contact and documented consent before any further processing of the learner's personal information.</p>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">Your rights</h3>
            <p className="text-sm text-[#5C6672]">You may ask what information we hold about you, ask for corrections, withdraw consent, or ask for deletion by contacting the Information Officer. You may lodge a complaint with the Information Regulator (South Africa) at inforegulator.org.za.</p>
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mt-6 mb-2">Retention</h3>
            <p className="text-sm text-[#5C6672]">Enquiry records are kept only as long as needed to provide support and meet legal obligations, after which they are deleted.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
};
