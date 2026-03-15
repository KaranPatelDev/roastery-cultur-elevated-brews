import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, Clock, Users, Phone, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  guests: z.string().min(1, "Select number of guests"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
  "9:00 PM", "10:00 PM",
];

const Reserve = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: "", phone: "", guests: "", date: "", time: "" },
  });

  const onSubmit = async (data: ReservationForm) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        name: data.name,
        phone: data.phone,
        guests: parseInt(data.guests),
        date: data.date,
        time: data.time,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-24">
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Reservations</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Reserve Your <span className="text-gradient-gold">Table</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Book a spot and let us prepare the perfect experience for you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
                    Reservation Confirmed!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We look forward to welcoming you. A confirmation will be sent to your phone.
                  </p>
                  <Button onClick={() => { setSubmitted(false); form.reset(); }}>
                    Make Another Reservation
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 md:p-10"
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground">
                              <User className="h-4 w-4 text-primary" /> Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" className="bg-muted border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground">
                              <Phone className="h-4 w-4 text-primary" /> Phone
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+91 XXXXX XXXXX" className="bg-muted border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground">
                              <Users className="h-4 w-4 text-primary" /> Guests
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-muted border-border">
                                  <SelectValue placeholder="Number of guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                                  <SelectItem key={n} value={n.toString()}>
                                    {n} {n === 1 ? "Guest" : "Guests"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-foreground">
                                <CalendarDays className="h-4 w-4 text-primary" /> Date
                              </FormLabel>
                              <FormControl>
                                <Input type="date" min={today} className="bg-muted border-border" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-foreground">
                                <Clock className="h-4 w-4 text-primary" /> Time
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-muted border-border">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((t) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
                        {loading ? "Reserving..." : "Reserve Table"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Reserve;
